const express = require('express')
const router = express.Router();
const {registerUser, updateProfile, deleteProfile, signIn, getDetails} = require('../controllers/user.controller');
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, msg: 'No users found' });
        }

        res.status(200).json({users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
});

router.post('/register',registerUser)

router.post('/signin',signIn)

router.delete('/remove',deleteProfile)

router.get('/details',getDetails)

router.put('/update',updateProfile)

module.exports = router;