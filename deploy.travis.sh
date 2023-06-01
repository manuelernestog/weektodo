#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
  yarn electron:build -p always
else
  sudo apt-get install libarchive-tools
  sudo apt-get install bsdtar
  sudo apt-get update -qq
  sudo apt-get install snapd
  sudo snap install snapcraft --classic
  echo $SNAP_TOKEN | snapcraft login --with -
  yarn electron:build --linux snap -p always
fi