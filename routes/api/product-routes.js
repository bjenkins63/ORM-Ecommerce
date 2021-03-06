const router = require('express').Router();
const { Product, Category, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');


// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"]
      },
      include: [{
        model: Category,
        attributes: ["category_name"],
      },
      {
        model: Tag,
        attributes: ["tag_name"],
      }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"]
      },
      include: [{
        model: Category
      },
      {
        model: Tag
      }]
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
  router.post('/', async (req, res) => {
    try {const product = await Product.create(req.body);
      if (req.body.tagIds.length) {
        const idArr = JSON.parse(req.body.tagIds);
        const productTagIdArr = idArr.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
        const outputArr = [product, productTagIds];
        res.status(200).json(outputArr);
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
   

router.put('/:id', async (req, res) => {
  // update product data
  try {
    const product = await Product.update(req.body, { where: { id: req.params.id } });
    if (req.body.tagIds.length) {
      // find all associated tags from ProductTag
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Parse tagIds into an array
      const idArr = JSON.parse(req.body.tagIds);
      // create filtered list of new tag_ids
      const newProductTags = idArr
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
      res.status(200).json(updatedProductTags);

     } else {
       res.status(200).json(product ? "Yessah!" : "Um,no")
     }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
  // delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
