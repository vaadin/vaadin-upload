#!/usr/bin/env node

oldversion=require('../package.json').version;
newversion=process.env.npm_package_version

const replace = require('replace-in-file');
const options = {
  files: '*.html',
  from: oldversion,
  to: newversion,
};

try {
  const updatedFiles = replace.sync(options);
  const simpleGit = require('simple-git')(".");
  simpleGit.add(updatedFiles);
  console.log('Modified files:', updatedFiles.join(', '));
}
catch (error) {
  console.error('Error occurred:', error);
}
