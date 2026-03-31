function isJsFile(filename) {
    return filename.endsWith('.js');
}

console.log(isJsFile("script.js"));
console.log(isJsFile("style.css"));
console.log(isJsFile("index.jsx"));
console.log(isJsFile("app.js"));