function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function hideAndShow(hide, show) {
    if (hide) $('.' + hide).addClass('hideContent');
    if (show) $('.' + show).removeClass('hideContent');

}
function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'meme.jpg';
}
function changeLine(lineNum) {
    gLineNum = lineNum;
}
function gotoContact(){
    window.scrollTo(0, 20000);
}
function onFileInputChange(ev) {
    handleImageFromInput(ev,renderCanvas)
}
