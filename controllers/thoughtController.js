const Thought = require('../models/Thought');
const User = require('../models/User'); // ✅ Ensure this is imported

module.exports = {
  // ✅ POST: Create a new thought and link it to the user
  createThought: async (req, res) => {
    try {
        console.log("Incoming Thought Data:", req.body); // ✅ Debug log

        // ✅ Create the Thought
        const thought = await Thought.create(req.body);

        // ✅ Attach Thought to User
        const user = await User.findOneAndUpdate(
            { username: req.body.username },  // Find user by username
            { $push: { thoughts: thought._id } }, // ✅ Add thought ID to user
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Thought created, but no user found with this username" });
        }

        res.json(thought);
    } catch (err) {
        console.error("Error creating thought:", err);
        res.status(500).json({ error: err.message });
    }
  },

  // ✅ GET all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // ✅ GET a single thought
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: "Thought not found" });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // ✅ PUT update a thought
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!thought) return res.status(404).json({ message: "Thought not found" });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // ✅ DELETE a thought
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: "Thought not found" });
      res.json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // ✅ POST add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      console.log("Incoming Reaction Data:", req.body); // ✅ Debug log

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) return res.status(404).json({ message: "Thought not found" });

      res.json(thought);
    } catch (err) {
      console.error("Error adding reaction:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ DELETE remove a reaction
  removeReaction: async (req, res) => {
    try {
      console.log("Removing reaction:", req.params.reactionId); // ✅ Debug log

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // ✅ Fix reaction ID format
        { new: true }
      );

      if (!thought) return res.status(404).json({ message: "Thought not found" });

      res.json({ message: "Reaction deleted successfully", thought });
    } catch (err) {
      console.error("Error removing reaction:", err);
      res.status(500).json({ error: err.message });
    }
  }
};
