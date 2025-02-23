const fs = require('fs');
const path = require('path');
const config = require('./config.json')

const behaviorPack_source = "./packs/BP";
const resourcePack_source = "./packs/RP";

const DEST = path.resolve(config.dest);
const PACK_NAME = config.pack_name;

const behaviorPack_dest = path.join(DEST, 'behavior_packs');
const resourcePack_dest = path.join(DEST, 'resource_packs');

function deleteOldFiles(targetDest) {
    if (!fs.existsSync(targetDest)) return;

    fs.rmSync(targetDest, { recursive:true });
    console.log(`Removed '${path.relative(DEST, targetDest)}'`);
}

function copyFolder(src, dest) {

    console.log(`Copy '${src}' to '${path.relative(DEST, dest)}'.`);

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
        console.log(`Created '${path.relative(DEST, dest)}' folder.`);
    }

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        
        if (fs.lstatSync(srcPath).isDirectory()) copyFolder(srcPath, destPath);
        else fs.copyFileSync(srcPath, destPath);
    });
}

console.log('Remove Old Files...');
deleteOldFiles(path.join(behaviorPack_dest, PACK_NAME));
deleteOldFiles(path.join(resourcePack_dest, PACK_NAME));
console.log('----');

console.log('Copy Files to Dest Folders.');
copyFolder(behaviorPack_source, path.join(behaviorPack_dest, PACK_NAME));
copyFolder(resourcePack_source, path.join(resourcePack_dest, PACK_NAME));
console.log('----');

console.log('Done!');
