const nanoid = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data);      
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contactDel = data.find((item) => item.id === contactId);
    if (!contactDel) return;
    const contactsFilter = data.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contactsFilter), "utf-8");
    return contactDel;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const contactData = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    data.push(contactData);
    await fs.writeln(contactsPath, JSON.stringify(data), "utf-8");
    return contactData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
