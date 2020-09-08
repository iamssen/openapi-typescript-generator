#!/usr/bin/env sh

# download openapi jap
#version="5.0.0-beta2"
#curl "https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/5.0.0-beta2/openapi-generator-cli-$version.jar" --output "bin/openapi-generator.jar"

# build codegen
cd codegen || exit 1
mvn package
cp target/ssen-typescript-openapi-generator-1.0.0.jar ../bin/ssen-typescript-openapi-generator.jar

# build packages
#cd ..
#cp bin/*.jar source/src/@rocket-scripts/openapi/bin/
#yarn run build:packages