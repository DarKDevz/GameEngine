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
let foldersWithTS = [...filteredFolders.map(folder => path.join('./dev/'+ folder, '*.ts')),...filteredFolders.map(folder => path.join('./dev/'+ folder, '*.js'))];
foldersWithTS.push("./dev/*.ts","./dev/*.js");
// Display the list of folders with "*.ts" in their paths
console.log('All folders with "*.ts" in their paths inside "dev" directory (excluding words):', foldersWithTS);
async function Build() {
let result = await esbuild.build({
  entryPoints: foldersWithTS,
  outdir: './docs',
})
console.log(result)
}
Build()