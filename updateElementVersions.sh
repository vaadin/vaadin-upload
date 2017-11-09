#!/bin/bash

oldversion=$(cat package.json|jq -r .version)
newversion=$npm_package_version

for file in *.html
do
	cat $file|sed "s/$oldversion/$newversion/g" > .file.newversion
	mv -f .file.newversion $file
	git add $file
done
