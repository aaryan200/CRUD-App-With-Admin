const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blogs');
const userRoute = require('./routes/users');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to MONGODB"))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend is running.");
});