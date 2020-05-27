#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {  readDirDeepSync } = require('read-dir-deep');

execute();

function hasDefault (filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  console.log(data)
  return data.includes('export default')
}

function execute()  {
  const relativePath = process.argv.length === 2 ? './' : process.argv[2];
  if (process.argv.length > 3) {
    console.log(`[ERROR] provide directory as the only argument`)
  }

  const targetPath = path.resolve(process.cwd(), relativePath);
  const files = readDirDeepSync(targetPath, { patterns: ['**/**.js'], ignore: ['index.js'] });
  console.log(`Target path: ${targetPath}`)

  const exports = []
  files.forEach((filePath) => {
    if (!hasDefault(filePath)) return;

    filePath = filePath.slice(filePath.indexOf(relativePath) + relativePath.length - 1)

    const noExtFilePath = filePath.replace('.js', '');
    const split = noExtFilePath.split('/');
    const fileName = split[split.length - 1];

    exports.push(`export { default as ${fileName} } from './${noExtFilePath}';`);
  });

  const out = exports.join('\n') + '\n';
  const writeTo = path.resolve(targetPath, './index.js');
  console.log('-----------')
  console.log(out)
  console.log('-----------')
  console.log(`Written to: ${writeTo}`)

  fs.writeFileSync(writeTo, out);
}