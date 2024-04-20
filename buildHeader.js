const fs = require('fs');

let htmlFiles = ["ballblast.html", "dash.html", "editor.html", "index.html", "map.html"];
let jsFiles = ["serviceWorker.js", "dev/engine/editor/contentBrowser.ts"];

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the file directory? ', (fileDirectory) => {
    // Trim to remove extra whitespace and newlines
    fileDirectory = fileDirectory.trim();
    let arr = fileDirectory.split('/');
    arr.reverse()
    htmlFilesReplace(arr);
    jsFilesReplace(arr)
    // Close the readline interface
    rl.close();
});

function htmlFilesReplace(arr) {
    let filesProcessed = 0;
    for (let html of htmlFiles) {
        fs.readFile('docs/' + html, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let found = null;
            for (let i of arr) {
                if (data.includes(i)) {
                    found = i;
                    break;
                }
            }
            if (!found) {
                throw new Error("file cant be added, directory doesn't exist")
            }
            let regex = new RegExp(found + '.*?script>', 'gm')
            let array = [...data.matchAll(regex)];
            let modifiedData = data.replace(array[array.length - 1][0], array[array.length - 1][0] + `\n\t<script src="${arr.reverse().join('/')}"></script>`);
            arr.reverse()

            // Write the modified content back to the file
            fs.writeFile('docs/' + html, modifiedData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                filesProcessed++;
                if (filesProcessed === htmlFiles.length) {
                    console.log("All files processed and modified successfully.");
                }
            });
        });
    }
}
function jsFilesReplace(arr) {
    let filesProcessed = 0;
    for (let js of jsFiles) {
        fs.readFile(js, 'utf8', (err, data) => {
            let found = null;
            for (let i of arr) {
                if (data.includes(i)) {
                    found = i;
                    break;
                }
            }
            if (!found) {
                throw new Error("file cant be added, directory doesn't exist")
            }
            let regex = new RegExp(found + `.*?,`, 'm')
            let array = [...data.match(regex)];
            let subst = `${array[0]}\n\t\t"${arr.reverse().join('/')}",`;
            arr.reverse()
            modifiedData = data.replace(regex, subst);
            fs.writeFile(js, modifiedData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                filesProcessed++;
                if (filesProcessed === jsFiles.length) {
                    console.log("All files processed and modified successfully.");
                }
            });
        });
    }
}