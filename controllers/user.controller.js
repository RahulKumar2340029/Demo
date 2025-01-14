const User = require('../models/user')
const bcrypt = require('bcrypt')

//1DNfIKgv5C9IAXPS
//karnrahul2001

async function registerUser(req, res){
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(404).json({success: false, msg: 'Enter valid details'})
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(404).json({success: false, msg: 'User already exists'})
    }

    //prepare salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);



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
            return res.status(400).json({success: true, msg:"User not exist please login"})
        } 
        // const salt = await bcrypt.getSalt(10);
        // const hashedPassword = await bcrypt.hash(password,salt);
        const isPasswordcorrect = await bcrypt.compare(password,isExisting.password);
    
        if(!isPasswordcorrect){
            return res.status(400).json({success: false, msg:"Wrong password"})
        }
    
        return res.status(200).json({success: true, msg: "Sign-in successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong, please try again later." });
    }
    
    
}


async function deleteProfile(req, res){
    
}


async function getDetails(req, res){
    // const userId = req.user?.id;
    const {id} = req.query

    if(!id){
        return res.status(400).json({success: false, msg: "user Id required"})
    }

    try {
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(400).json({success: false, msg: "User not found"});
        }
        return res.status(200).json({success: true,user});
    } catch (error) {
        console.error("Error fetching details" ,error);
        return res.status(500).json({success: false,msg:"Internal Server Error"})
        
    }
}

async function updateProfile(req, res){
    const {username, email} = req.body;

    // const userId = req.user?.id;
    const {id} = req.query;

    if(!id){
        return res.status(400).json({success: false,msg:"userid required"})
    }

    if(!username || !email) {
        return res.status(400).json({success: false,msg:"Fields required"})
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            {username, email},
            {new: true}
        )

        if(!user){
            return res.status(400).json({success: false,msg:""})
        }

        return res.status(200).json({success: true, user})
    } catch (error) {
        console.error("Error updating profile", error);
        return res.status(500).json({success: false,msg:"Internal Server error"})
        
    }
}

module.exports = {
    updateProfile,
    deleteProfile,
    getDetails,signIn,
    registerUser
}