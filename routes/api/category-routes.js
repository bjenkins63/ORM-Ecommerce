const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        { 
          model: Product,
          attributes: [
           'name',
           'price',
           'stock',
           'tag_id',
          ],
        },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: ProductTag }, { model: Product }],
      });
  
      if (!readerData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// router.put('/:id', (req, res) => {
  // update a category by its `id` value
  router.put('/:catagory_id', (req, res) => {
    Category.update(
      {
        name: req.body.name,
      },
      {
        where: {
          category_id: req.params.catgory_id,
        },
      }
    )
      .then((updatedCategory) => {
        res.json(updatedCategory);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
