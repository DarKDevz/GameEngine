const esbuild = require('esbuild')

const fs = require('fs');
const path = require('path');

const directoryPath = './dev';
const excludedWords = ['libs', 'utils', 'types', 'examples'];

// Function to get all folders recursively with full paths inside a directory
function getAllFoldersRecursive(directoryPath, currentPath = '') {
  try {
    // Read the contents of the directory
    const files = fs.readdirSync(path.join(directoryPath, currentPath));

    // Filter out only directories
    const folders = files.filter(file => fs.statSync(path.join(directoryPath, currentPath, file)).isDirectory());

    // Recursively get folders from subdirectories
    const subFolders = folders.flatMap(folder => getAllFoldersRecursive(directoryPath, path.join(currentPath, folder)));

    return [...folders.map(folder => path.join(currentPath, folder)), ...subFolders];
  } catch (error) {
    console.error('Error reading directory:', error.message);
    return [];
  }
}

// Get all folders in the "dev" directory and its subdirectories with full paths
const allFolders = getAllFoldersRecursive(directoryPath);

// Filter the folders to exclude specified words
const filteredFolders = allFolders.filter(folder => !excludedWords.some(word => folder.includes(word)));

// Add "*.ts" to each folder path
let foldersWithTS = [...filteredFolders.map(folder => path.join('./dev/' + folder, '*.ts')), ...filteredFolders.map(folder => path.join('./dev/' + folder, '*.js'))];
foldersWithTS.push("./dev/*.ts", "./dev/*.js");
// Display the list of folders with "*.ts" in their paths
console.log('All folders with "*.ts" in their paths inside "dev" directory (excluding words):', foldersWithTS);
async function Build() {
  let result = await esbuild.build({
    entryPoints: foldersWithTS,
    outdir: './docs',
  })
  console.log(result);
  const filePath = './serviceWorker.js';
  // Output file path
  const outputFilePath = './docs/serviceWorker.js';
  const generateRandomString = (length) => [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}: ${err}`);
      return;
    }
    let buildID = generateRandomString(20)
    // Add a line at the start of the file
    const modifiedContent = `const cacheName = 'Shimmer-build-${buildID}';
  \n${data}`;

    // Write the modified content to the output file
    fs.writeFile(outputFilePath, modifiedContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing to ${outputFilePath}: ${writeErr}`);
      }
    });
    console.log(buildID);
    // If you want to save the modified content back to the file, uncomment the following lines:
    // fs.writeFile(filePath, modifiedContent, 'utf8', (writeErr) => {
    //   if (writeErr) {
    //     console.error(`Error writing to ${filePath}: ${writeErr}`);
    //   } else {
    //     console.log(`${filePath} has been updated successfully.`);
    //   }
    // });
  });
}
Build()