const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/ContactController");

const router = express.Router();

// get all contacts
router.get("/", getContacts);

// get a single contact
router.get("/:id", getContact);

// create a new contact
router.post("/", createContact);

// delete a contact
router.delete("/:id", deleteContact);

// update a contact
router.patch("/:id", updateContact);

module.exports = router;
