#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
    npm electron:build -p always
else
    docker run --rm -e GH_TOKEN -v "${PWD}":/project -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "npm electron:build -p always"
fi