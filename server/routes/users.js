
const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const authenticateUser = require('../middleware/auth');

// Get user profile
router.get('/:userId', authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if requesting own profile
    if (req.user.uid !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create or update user profile
router.post('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { displayName, email } = req.body;
    
    const userData = {
      uid: userId,
      email: email || req.user.email,
      displayName: displayName || '',
      updatedAt: new Date().toISOString(),
    };
    
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      userData.createdAt = new Date().toISOString();
    }
    
    await db.collection('users').doc(userId).set(userData, { merge: true });
    
    res.json({ 
      ...userData,
      message: 'User profile updated successfully' 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
