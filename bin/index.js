#!/usr/bin/env node
const message = console.log('Hello My Love again');
const fs = require('fs');

//returns an array of the directory // computation
const readDir = (path) => {
    return fs.readdirSync(path, {}, (err, files) => {
        if (err) throw err;
        else if (files.legnth === 0) return 'the directory is empty'
        console.log('The dir has been read!');
    })
}

//create a directory // { recursive: true } was the key
//if root directory, then second param is empty string
const createDir = (path,el = '') => {
    fs.mkdir(`${path}/${el}`, { recursive: true }, (err) => {
        if (err) throw err;
        console.log(`The dir ${path}/${el} has been created!`);
    })
}

// create a file
const createFile = (files) => {
    files.map(file => {
        //console.log(Object.keys(file)[0]);
        fs.writeFile(`${Object.keys(file)[0]}`, Object.values(file)[0], 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
}

//copy file function
const copyfile = (originPath,destPath,el) => {
    return fs.copyFile(`${originPath}/${el}`, `${destPath}/${el}`, (err) => {
        if (err) throw err;
        console.log(`The file ${el} has been copied to the destination!`);
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
const originPath = './bin/content'; //dynamic
const srcOriginPath = `${originPath}/src`; //get from readDir function it returns an array
const distOriginPath = `${originPath}/dist`; //get from readDir function it returns an array

//list of directories use .push to build this or recursion
const dirs = []
const files = []
    
createDir(destPath);//creates the root directory of the project
copyDir(originPath, destPath);//creates the children files and directories
copyDir(srcOriginPath, srcDestPath);//creates the grandchildren files and directories
copyDir(distOriginPath, distDestPath);//more grandchildren
