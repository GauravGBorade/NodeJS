const mongoose = require("mongoose");

// * creating schema
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    integer: true,
    /* validate: { 
    !  creating a validation for a phone number to be strictly of 10 digits.
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    }, */
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
