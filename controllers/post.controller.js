const Post = require('../models/post')
const User = require('../models/user')

async function createPost(req, res) {
    console.log('entered in createpostroute')
    const { title, content, visibility, emails } = req.body;
    const { userId } = req.query;

    if (!userId || !content || !title) {
        return res.status(400).json({ success: false, msg: "userid and content required" })
    }
    console.log(title , content, visibility, userId);

    try {
        const newPost = new Post({
            title,
            content,
            visibility,
            user: userId,  
        });

        if (emails && emails.length > 0) {
            const uniqueEmails = [...new Set(emails)]; 
            
            for (const email of uniqueEmails) {
                const collaborator = await User.findOne({ email });
                
                if (!collaborator) {
                    return res.status(400).json({ success: false, msg: `Collaborator with email ${email} does not exist` });
                }

                if (collaborator._id.toString() === userId.toString()) {
                    return res.status(400).json({ success: false, msg: "You can't put yourself as a collaborator" });
                }

                newPost.collaborators.push({
                    email: collaborator.email,
                    userId: collaborator._id,
                });
            }
        }

        await newPost.save();

        res.status(201).json({ success: true, msg: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}



async function getAllPublicPosts(req, res) {
    try {
        const posts = await Post.find({
            visibility: { $ne: 'private' }
        });

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

async function getAllPosts(req, res) {
    
    try {
        const posts = await Post.find({
            
        });

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
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, msg: 'UserId is required' });
    }

    try { 
        const posts = await Post.find({
            $or: [
                { user: userId }, 
                { 'collaborators.userId': userId },
                { visibility: 'public' }
            ]
        }).populate('collaborators.userId', 'username email');

        if (posts.length === 0) {
            return res.status(404).json({ success: false, msg: 'No posts found for this user' });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}


async function updatePost(req, res) {
    const postId = req.params.postId;
    const { content, visibility } = req.body;

    if (!postId || !content || !visibility) {
        return res.status(400).json({ success: false, msg: "all fields are required" })
    }

    try {
        const posts = await Post.findByIdAndUpdate(
            postId,
            { content, visibility },
            { new: true }
        );

        if (!posts) {
            return res.status(400).json({ success: false, msg: "post not exist" })
        }

        return res.status(200).json({ success: true, msg: "Post updated successfully", posts });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
}

async function deletePostById(req, res) {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ success: false, msg: "Post id required" })
    }
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(400).json({ success: false, msg: "post with this id not exist" })
        }

        return res.status(200).json({ success: true, msg: 'post deleted successfully' })


    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
}


module.exports = {
    createPost,
    getAllPublicPosts,
    getPostByUserId,
    updatePost,
    deletePostById,
    getAllPosts
}