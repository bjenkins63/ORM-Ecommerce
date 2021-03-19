const router = require('express').Router();
const { Tag, Product } = require('../../models');

  // find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [ { model: Product } ],
    });

    if (!tagId) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }

    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create( {
        category_id: req.body.category_id,
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  router.put('/:tag_id', (req, res) => {
    //Calls the update method on the Book model
    productTag.update(
      {
        // All the fields you can update and the data attached to the request body.
        product_id: req.body.product_id,
        tag_id: req.body.tag_id,
      },
      {
        where: {
          productTag_id: req.params.productTag_id,
        },
      }
    )
      .then((updatedproductTag) => {
        res.json(updatedproductTag);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

// });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
