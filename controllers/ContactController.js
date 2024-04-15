const mongoose = require("mongoose");
const Contact = require("../models/ContactModel");

// get all contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

// get a single contact
const getContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such contact");
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).send("No such contact");
  }

  res.status(200).json(contact);
};

// create a new contact
const createContact = async (req, res) => {
  const { fullName, email, phoneNumber, gender } = req.body;

  // add doc to DB
  try {
    const contact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      gender,
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such contact");
  }

  const contact = await Contact.findByIdAndDelete({ _id: id });

  if (!contact) {
    return res.status(404).send("No such contact");
  }

  res.status(200).json(contact);
};

// update a contact
const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such contact");
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!contact) {
    return res.status(404).send("No such contact");
  }

  res.status(200).json(contact);
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
