#!/bin/bash

echo "Start deployment"
echo "pulling source code..."
git reset --hard origin/develop
git clean -f
git pull
git checkout develop
yarn run build
echo "Finished."
