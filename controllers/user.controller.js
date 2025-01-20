const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = "$uperman123"

//1DNfIKgv5C9IAXPS
//karnrahul2001

async function registerUser(req, res){
    console.log('Enter in register route');
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(404).json({success: false, msg: 'Enter valid details'})
    }
    console.log({username,email,password});
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(404).json({success: false, msg: 'User already exists'})
    }

    //prepare salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const token = jwt.sign(
        {username: username,email:email},
        secret_key,
        {expiresIn: '1h'}
    )
    res.cookie('X_post',token);

    console.log(`token: ${token}`);

    


    const newUser = await User.create({
        username: username,
        email : email,
        password : hashedPassword,
    })

    return res.status(200).json({success: true,msg: 'User Registed successfully!'})

}

async function signIn(req, res){
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({msg: 'Provide valid details'})
    }

    try {
        const isExisting = await User.findOne({email});
        if(!isExisting){
            return res.status(400).json({success: true, msg:"User not exist please register"})
        } 
        // const salt = await bcrypt.getSalt(10);
        // const hashedPassword = await bcrypt.hash(password,salt);
        const isPasswordcorrect = await bcrypt.compare(password,isExisting.password);
    
        if(!isPasswordcorrect){
            return res.status(400).json({success: false, msg:"Wrong password"})
        }
        const token = jwt.sign(
            {username: username,email:email},
            secret_key,
            {expiresIn: '1h'}
        )
        res.cookie('X_post',token);
    
        return res.status(200).json({success: true, msg: `${isExisting.username} Signed-in successfully`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong, please try again later." });
    }
    
    
}


async function deleteProfile(req, res){
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, msg: "User ID is required" });
        }

        const deletedUser = await User.findByIdAndDelete(userId); 

        if (!deletedUser) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        return res.status(200).json({
            success: true,
            msg: "Profile deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
}


async function getDetails(req, res){
    // const userId = req.user?.id;
    const {userId} = req.query

    if(!userId){
        return res.status(400).json({success: false, msg: "user Id required"})
    }

    try {
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({success: false, msg: "User not found"});
        }
        return res.status(200).json({success: true,user});
    } catch (error) {
        console.error("Error fetching details" ,error);
        return res.status(500).json({success: false,msg:"Internal Server Error"})
        
    }
}

async function updateProfile(req, res) {
    console.log('Entered in update profile ');
    
    const { username, email } = req.body; 
    const { userId } = req.query;        

    if (!userId) {
        return res.status(400).json({ success: false, msg: "UserId is required" });
    }

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ success: false, msg: "No fields to update." });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}


module.exports = {
    updateProfile,
    deleteProfile,
    getDetails,signIn,
    registerUser
}