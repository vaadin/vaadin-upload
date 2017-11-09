#!/bin/bash

npmVersion=$(node -e "console.log(require('./package.json').version)")
offendingVersions=$(grep 'static get version()' *.html -A1|grep return|grep -v "return '$npmVersion';")

if [ "$offendingVersions" != "" ]
then
  echo "Versions in HTML files do not match the expected '$npmVersion'"
  echo $offendingVersions
  exit 1
fi
