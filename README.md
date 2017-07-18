# my-realm-utils
A couple of utility scripts I can use when using Realm

## many-users

Generates `N` users with the a username like `user-${runNumber}-0`, `user-${runNumber}-1`, `user-${runNumber}-2`.. etc.

To create 100 users, run

    npm run many-users -- 100

## many-objects

Generates `N` object of `DummyType` with a single string field, in a realm owned by the administrator.

To create 100 objects, run

    npm run many-objects -- 100
