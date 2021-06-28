#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
  yarn electron:build -p always
else
  sudo apt-get update -qq
  sudo apt-get install snapd
  sudo snap install snapcraft --classic
  echo $SNAP_TOKEN | snapcraft login --with -
  docker run --rm -e GH_TOKEN -v "${PWD}":/project -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "yarn electron:build --linux deb rpm snap --win nsis -p always"
fi