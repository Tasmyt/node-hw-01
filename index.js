const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");

const program = new Command();
program
  .option('-a, --action <string>', 'choose action: list, add -n -e -p, get -i, remove -i')
  .option('-i, --id <string>', 'user id')
  .option('-n, --name <string>', 'user name')
  .option('-e, --email <string>', 'user email')
  .option('-p, --phone <string>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
          const list = await listContacts();
          console.table(list);
      break;

      case 'get':
          const get = await getContactById(id);
          if (!get) console.log('contact not found');
          console.log(get);
      break;

      case 'add':
          const add = await addContact(name, email, phone);
          console.log(`${add}, has been added`);

      break;

      case 'remove':
          const remove = await removeContact(id);
          console.log(`Deleted contact:`, remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);