const mongoose = require("mongoose");


const shoeSchema = new mongoose.Schema({
  shoeName: {
    type: String,
    required: true,
  },
  designer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  collaboration:{
    type:String,
    required:true
  },
  comments: [
    {
      content: {
        type: String,
        required: true
      },
      username:{
        type: String,
        required: true
      }

    }
  ],
});

module.exports = mongoose.model("Shoe", shoeSchema);
