const express = require('express');
const dotenv = require('dotenv');

const authRoutes = require('../Backend/routes/authRoutes');
const messageRoutes = require('../Backend/routes/messageRoutes.js');
const userRoutes = require('../Backend/routes/userRoutes.js');

const { connectToMongoDB } = require('../Backend/db/connectToMongoDB');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(express.json());

app.use(cookieParser());


app.get('/', (req, res) =>
{
    res.send("Hello World");
});


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
})

