import * as dotenv from "dotenv";
import randomName from "node-random-name";
import * as path from "path";
import * as Realm from "realm";

dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});

const {
  REALM_HOST, REALM_PORT, REALM_USERNAME, REALM_PASSWORD,
} = process.env;

const count = parseInt(process.argv.pop(), 10);

console.log(`Creating ${count} objects`);

Realm.Sync.User.login(
  `http://${REALM_HOST}:${REALM_PORT}`,
  REALM_USERNAME,
  REALM_PASSWORD,
(error, user) => {
  const realm = new Realm({
    schema: [{name: "DummyType", properties: {
      name: "string",
    }}],
    sync: {
      url: `realm://${REALM_HOST}:${REALM_PORT}/~/dummy`,
      user,
    },
  });

  realm.write(() => {
    for (let i = 0; i < count; i++) {
      realm.create("DummyType", {
        name: randomName(),
      });
    }
  });
});
