const express = require('express')
const app = express();
const connectToDatabase = require('./db')
app.use(express.json())

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')


const PORT = 3000; 

connectToDatabase('mongodb+srv://karnrahul2001:1DNfIKgv5C9IAXPS@cluster0.ah0ou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.use('/user',userRoutes);
app.use('/post',postRoutes);

app.use((req, res,next,err)=>{
    console.error('Internal server error');
    res.status(404).json({msg: "Internal Server error"})
    
})

app.listen(PORT, ()=>console.log(`server running at PORT: ${PORT}`))