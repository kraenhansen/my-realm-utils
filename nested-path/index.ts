import getName = require("node-random-name");
import * as path from "path";
import * as Realm from "realm";

const REALM_HOST = process.env.REALM_HOST || "localhost";
const REALM_PORT = process.env.REALM_PORT || 9080;
const REALM_SYNC_URL = `http://${REALM_HOST}:${REALM_PORT}`;

const runNumber = Math.round(Math.random() * 10000);

const username = `random-user-${runNumber}`;
const password = "s3cur3-yes-very-much";

console.log(`Creating a realm at at nested path owned by the user ${username}`);

Realm.Sync.User.register(
  REALM_SYNC_URL,
  username,
  password,
  (err, user) => {
    if (err) {
      console.error(err);
    }
    const realm = new Realm({
      schema: [{name: "DummyType", properties: {
        name: "string",
      }}],
      sync: {
        url: `realm://${REALM_HOST}:${REALM_PORT}/~/very/deeply/nested/realm`,
        user,
      },
    });

    realm.write(() => {
      for (let i = 0; i < 10; i++) {
        realm.create("DummyType", {
          name: getName(),
        });
      }
    });
  },
);
