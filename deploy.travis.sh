#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
    npm run electron:build -- -p always
else
    docker run --rm -e GH_TOKEN -v "${PWD}":/project -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "npm run electron:build -- --linux deb rpm snap --win nsis"
fi