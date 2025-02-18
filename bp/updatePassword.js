const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');

    const password = 'admin'; // The plain text password
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) throw err;

      // Update the password with the hashed version
      mongoose.connection.db.collection('users').updateOne(
        { username: 'admin' },
        { $set: { password: hashedPassword } }
      ).then(() => {
        console.log('Password updated successfully');
        mongoose.disconnect(); // Disconnect after the operation
      }).catch(err => {
        console.error('Error updating password:', err);
        mongoose.disconnect();
      });
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
