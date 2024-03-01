import * as fs from 'fs';

console.log('Generating icon list ...');

// Parse the selection.json file and then make a new json file with a list of all icons
// File Format:
// {
//   "icons": [
//     "test1",
//     "test2"
//   ]
// }

const file = fs.readFileSync('icon-fonts/selection.json');
const json = JSON.parse(file);
const iconList = [];
let iconListFileContents = '{\n  "icons": [\n';

for (const icon of json.icons) {
  iconList.push(icon.icon.tags[0]);
}
iconList.sort();

let cnt = 0;
for (let index = 0; index < iconList.length; index++) {
  if (iconList[index].toLowerCase() === iconList[index]) {
    cnt++;
    iconListFileContents += `    "${iconList[index]}"${index !== iconList.length - 1 ? ',' : ''}\n`;
  }
}
iconListFileContents += '  ]\n}';

fs.writeFile('icon-fonts/icon-list.json', iconListFileContents, (err) => {
  if (err) console.log(err);
  else console.log(`Created icon-list.json with ${cnt} icons`);
});
