const User = require('../models/User');


// ✅ GET all users
async function getUsers(req, res) {
    try {
        const users = await User.find()
            .populate('thoughts')  // ✅ Populates Thoughts
            .populate({
                path: 'thoughts',
                populate: { path: 'reactions' } // ✅ Populates Reactions inside Thoughts
            });

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}


// ✅ GET a single user by ID
async function getSingleUser(req, res) {
  try {
    const user = await User.findById(req.params.userId)
    .populate('thoughts')
    .populate('friends');


      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json(err);
  }
}


// ✅ POST create a user
async function createUser(req, res) {
    try {
        console.log("Incoming user data:", req.body); // ✅ Debug log
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.error("Error creating user:", err); // ✅ Log error
        res.status(500).json({ error: err.message });
    }
}

// ✅ PUT update a user
async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// ✅ DELETE remove a user
async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
}

// ✅ POST add a friend
async function addFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// ✅ DELETE remove a friend
async function removeFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// ✅ Export all functions properly
module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};
