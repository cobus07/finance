#!/bin/bash
dbpath="~/test"

echo `cd $dbpath && pwd`

if ! [ -d "$dbpath" ]; then
  mkdir -p "$dbpath"
fi

mongod --dbpath "$dbpath"
mongo
use finance
db.createCollection('users');
db.users.insert({
  name: '测试账户',
  username: 'test',
  password: 'test',
});
