
window.addEventListener('load', function () {
    createCodeMarks();
})

function createCodeMarks() {
    const main = document.getElementById("main");
    const allcodes = main.getElementsByTagName("code");
    for (let code of allcodes) {
        for (let keyword of keywords){
            code.innerHTML = code.innerHTML.replace(keyword, `<mark>$1</mark>`)
        }
    }    
}

const keywords = [
    /((?:^|\s)[a-z_]+\:)/g, //yml
    /((?:\".*")|(?:\'.*')|(?:\`.*`))/g, //"text", 'text', `text`
    /((?:^|\s?)(?:function|const|for|foreach|let|of|var|if|else)\s|(?:foreach(?=\()))/g //most js/ts stuff
]