const Post = require('../models/post')
const User = require('../models/user')

async function createPost(req, res) {
    const { content, visibility } = req.body;
    const { userId } = req.query;

    if (!userId || !content) {
        return res.status(400).json({ success: false, msg: "userid and content required" })
    }
    console.log(content, visibility, userId);

    try {
        const newPost = new Post({
            content,
            visibility,
            user: userId,  // assign userId from the request
        });

        await newPost.save();

        res.status(201).json({ success: true, msg: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();

        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, msg: 'No posts found' });
        }

        // Respond with the list of users
        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}

async function getPostByUserId(req, res) {
    const userId = req.params.userId; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        const posts = await Post.find({ user: userId }); 
        if (posts.length === 0) {
            return res.status(400).json({ success: false, msg: "This user has created no posts" });
        }

        return res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: "Server error" });
    }

}


async function updatePost(req,res){
    const postId = req.params.postId;
    const {content, visibility} = req.body;

    if(!postId || !content || !visibility){
        return res.status(400).json({success: false,msg:"all fields are required"})
    }

    try {
        const posts = await Post.findByIdAndUpdate(
            postId,
            {content, visibility},
            {new: true}
        );

        if(!posts){
            return res.status(400).json({success: false,msg:"post not exist"})
        }

        return res.status(200).json({ success: true, msg: "Post updated successfully", posts });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
}

async function deletePostById(req, res){
    const {postId} = req.params;

    if(!postId) {
        return res.status(400).json({success: false,msg:"Post id required"})
    }
    try {
        const post = await Post.findByIdAndDelete(postId);
        if(!post){
            return res.status(400).json({success: false,msg:"post with this id not exist"})
        }

        return res.status(200).json({success: true,msg: 'post deleted successfully'})


    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostByUserId,
    updatePost,
    deletePostById
}