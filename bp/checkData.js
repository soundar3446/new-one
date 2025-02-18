const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming you have the User model defined as in your previous code

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');

    // Fetch all users from the User collection
    User.find()
      .then(users => {
        console.log('All users:', users);
        mongoose.disconnect(); // Close the connection after fetching the data
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        mongoose.disconnect(); // Close the connection on error
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
