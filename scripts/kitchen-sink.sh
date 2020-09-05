#!/usr/bin/env sh

# build codegen
cd codegen || exit 1
mvn package
cp target/ssen-typescript-openapi-generator-*.jar ../cli/bin/ssen-typescript-openapi-generator.jar

# build packages
cd ..
yarn run build:packages

# install
yarn

rm -rf kitchen-sink
cp -R resources kitchen-sink

node scripts/kitchen-sink.js