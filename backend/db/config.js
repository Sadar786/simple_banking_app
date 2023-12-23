const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/e-commernce", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    console.log('MongoDB connected successfully');
  }
});
