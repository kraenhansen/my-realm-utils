import * as assert from "assert";
import * as path from "path";
import * as Realm from "realm";

const REALM_HOST = process.env.REALM_HOST || "localhost";
const REALM_PORT = process.env.REALM_PORT || 9080;
const REALM_USERNAME = process.env.REALM_USERNAME;
const REALM_PASSWORD = process.env.REALM_PASSWORD;
assert(REALM_USERNAME, `You need to specify a REALM_USERNAME`);
assert(REALM_PASSWORD, `You need to specify a REALM_PASSWORD`);

const REALM_SYNC_URL = `http://${REALM_HOST}:${REALM_PORT}`;

const count = parseInt(process.argv.pop(), 10);
const runNumber = Math.round(Math.random() * 10000);

Realm.Sync.User.login(
  REALM_SYNC_URL,
  REALM_USERNAME,
  REALM_PASSWORD,
  (err, user) => {
    if (err) {
      if (err) {
        console.error(err);
      }
    } else {
      console.log("Logged in user", user.identity);
      for (let i = 0; i < count; i++) {
        const realm = new Realm({
          schema: [{name: "DummyType", properties: {
            name: "string",
          }}],
          sync: {
            url: `realm://${REALM_HOST}:${REALM_PORT}/~/realm-${runNumber}-${i}`,
            user,
          },
        });
      }
    }
  },
);
