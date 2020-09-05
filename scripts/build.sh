#!/usr/bin/env sh

# build codegen
cd codegen || exit 1
mvn package
cp target/ssen-typescript-openapi-generator-*.jar ../cli/bin/ssen-typescript-openapi-generator.jar

# build packages
cd ..
yarn run build:packages