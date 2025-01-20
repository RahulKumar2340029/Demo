const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const connectToDatabase = require('./db')
const cors = require('cors')
app.use(express.json())

app.use(cookieParser())
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

const PORT = 3001; 

const corsOption={
    origin: 'http://localhost:5173',
    methods : "GET, POST, PUT, DELETE",
    credentials: true,
}
app.use(cors(corsOption));

connectToDatabase('mongodb+srv://karnrahul2001:1DNfIKgv5C9IAXPS@cluster0.ah0ou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.use('/user',userRoutes);
app.use('/post',postRoutes);

app.use((req, res,next,err)=>{
    console.error('Internal server error');
    res.status(404).json({msg: "Internal Server error"})
    
})

app.listen(PORT, ()=>console.log(`server running at PORT: ${PORT}`))