#!/bin/bash

echo "Start deployment"
echo "pulling source code..."

git reset --hard origin/develop
git clean -f
git pull
git checkout develop
yarn
yarn run build
pm2 restart vue-admin

echo "Finished."
