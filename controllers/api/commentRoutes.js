const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a specific comment by ID
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(commentData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
