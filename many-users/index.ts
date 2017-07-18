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

const REALM_SYNC_URL = `http://${REALM_HOST}:${REALM_PORT}`;

const count = parseInt(process.argv.pop(), 10);
const runNumber = Math.round(Math.random() * 10000);

console.log(`Creating ${count} users`);

for (let u = 0; u < count; u++) {
  const username = `user-${runNumber}-${u}`;
  const password = "s3cur3-yes-very-much";
  Realm.Sync.User.register(REALM_SYNC_URL, username, password, (err, user) => {
    if (err) {
      throw err;
    } else {
      console.log("Created user", user.identity);
      const realm = new Realm({
        schema: [{name: "DummyType", properties: {
          name: "string",
        }}],
        sync: {
          url: `realm://${REALM_HOST}:${REALM_PORT}/~/dummy`,
          user,
        },
      });
    }
  });
}
