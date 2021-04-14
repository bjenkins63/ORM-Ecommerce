const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

  // find all tags

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"]
      },
      include: [{
        model: Product,
        attributes: ["product_name"],
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"]
      },
      include: [{
        model: Product,
        attributes: ["product_name"],
      }]
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create(req.body);
          res.status(200).json(tagData);
        } catch (err) {
          res.status(400).json(err);
        }
      });

  router.put('/:id', async (req, res) => {
    //Calls the update method on the Book model
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!tagData) {
        res.status(200).json({ message: "no tag found" });
        return;
      }
      res.status(200).json(tagData ? "yes!" : "no...");
      } catch (err) {
        res.status(500).json(err);
      }
    });


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
    res.status(200).json(tagData  ? "Nice work" : "no, try again");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
