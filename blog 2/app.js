const express = require('express');
const app = express();
const passport = require('passport');


require('./config/passport')(passport);
app.use(passport.initialize());

//require route modules
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

//middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The server is up and running.');
});

//use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

//set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});