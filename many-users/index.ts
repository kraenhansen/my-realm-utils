import * as path from "path";
import * as Realm from "realm";

const REALM_HOST = "localhost";
const REALM_PORT = 9080;
const REALM_SYNC_URL = `http://${REALM_HOST}:${REALM_PORT}`;

const count = parseInt(process.argv.pop(), 10);
const runNumber = Math.round(Math.random() * 10000);

console.log(`Creating ${count} users`);

for (let u = 0; u < count; u++) {
  const username = `user-${runNumber}-${u}`;
  const password = "s3cur3-yes-very-much";
  Realm.Sync.User.register(
    REALM_SYNC_URL,
    username,
    password,
    (err, user) => {
      if (err) {
        if (err) {
          console.error(err);
        }
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
    },
  );
}
