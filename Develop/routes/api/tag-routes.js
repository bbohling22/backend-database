const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// include: [{ model: Product, through: ProductTag}] LOOK AT THIS!!!!
router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag}],
    });
    if (!oneTag) {
      res.status(404).json({ message: "Id Not Found" });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const oneTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const oneTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!oneTag) {
      res.status(404).json({ message: "Id Not Found" });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const oneTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!oneTag) {
      res.status(404).json({ message: "Id Not Found" });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
