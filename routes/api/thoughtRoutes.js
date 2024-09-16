const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)        // GET all thoughts
  .post(createThought);     // POST a new thought

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)    // GET a single thought by ID
  .put(updateThought)       // PUT to update a thought by ID
  .delete(deleteThought);   // DELETE to remove a thought by ID

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);       // POST to add a reaction to a thought

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);  // DELETE to remove a reaction by ID

module.exports = router;
