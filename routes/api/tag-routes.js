const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', (req, res) => {
  try {
    const ProductTag = await Tag.findAll({
      // Add Product as a second model to JOIN with
      include: [{ model: ProductTag }, { model: Product }],
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const ProductTag = await ProductTags.findByPk(req.params.id, {
      include: [{ model: productTag }, { model: Product }],
    });

    if (!productTagId) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }

    res.status(200).json(productTagId);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const productTag = await ProductTag.create(req.body);
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value




  


  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const productTagData = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productTagData) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
