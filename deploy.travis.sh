#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
  yarn electron:build -p always
else
  yarn electron:build --linux snap -p always
fi