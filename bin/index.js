#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

//returns an array of the directory // computation
const readDir = (path) => {
    return fs.readdirSync(path, {}, (err, files) => {
        if (err) throw err;
        else if (files.legnth === 0) return 'the directory is empty'
        
    })
}

//create a directory // { recursive: true } was the key
//if root directory, then second param is empty string
const createDir = (path,el = '') => {
    fs.mkdir(`${path}/${el}`, { recursive: true }, (err) => {
        if (err) throw err;
    })
}

// create a file
const createFile = (files) => {
    files.map(file => {
        fs.writeFile(`${Object.keys(file)[0]}`, Object.values(file)[0], 'utf8', (err) => {
            if (err) throw err;
        });
    })
}

//copy file function
const copyfile = (originPath,destPath,el) => {
    return fs.copyFile(`${originPath}/${el}`, `${destPath}/${el}`, (err) => {
        if (err) throw err;
    });
}

//action
const copyDir = (originPath, destPath) => {
    readDir(originPath).forEach(el => {
        if(el.includes(".")){
            copyfile(originPath,destPath, el)
        }else{
            createDir(destPath, el)
        }
    })
}


// make these dynamic?
const destPath = './'; //dynamic
const srcDestPath = `${destPath}/src`;
const distDestPath = `${destPath}/dist`;
const originPath = `${__dirname}/react`; //dynamic
const srcOriginPath = `${originPath}/src`; //get from readDir function it returns an array
const distOriginPath = `${originPath}/dist`; //get from readDir function it returns an array

//list of directories use .push to build this or recursion
const dirs = []
const files = []
    
createDir(destPath);//creates the root directory of the project
console.log(__dirname);
copyDir(originPath, destPath);//creates the children files and directories
copyDir(srcOriginPath, srcDestPath);//creates the grandchildren files and directories
copyDir(distOriginPath, distDestPath);//more grandchildren
