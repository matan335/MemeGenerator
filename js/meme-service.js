function renderEditor(selectedImgId) {
    hideAndShow('container', 'editor')
    var currImgSrc = gImgs[selectedImgId].url
    var currImg =
        `
     <img id="${selectedImgId}"class="meme-img meme-${selectedImgId} meme-on-edit" src="${currImgSrc}">
     `

    $('.pic-for-canvas').html(currImg)
    renderCanvas(selectedImgId)
}


function renderCanvas(selectedImgId) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var canvasImg = document.querySelector('.meme-on-edit')
    gCtx.drawImage(canvasImg, 0, 0);
    $('.meme-on-edit').addClass('hideContent')
}

function backToGallery() {
    lastTextLength = 0;
    lastText = null;
    $('.meme-text').val(lastText)
    hideAndShow('editor', 'container')

}

function hideAndShow(hide, show) {
    $('.' + hide).addClass('hideContent')
    $('.' + show).removeClass('hideContent')

}

function renderText() {
    var txt = $('.meme-text').val()
    var currMeme = getCurrMeme()
    var height = currMeme.txts.height
    if (lastTextLength > txt.length) {
        renderCanvas()
        if (!txt) return;
    }
    gCtx.fillStyle = currMeme.txts.color
    var fontSize = currMeme.txts.size
    gCtx.font = fontSize+'px Arial';
    gCtx.fillText(txt, 50, height);
    gCtx.strokeText(txt, 50, height);
    lastText = txt;
    lastTextLength = txt.length;

}

function getCurrMeme(id) {
    if (!id) {
        var currImg = document.querySelector('.meme-on-edit')
        var id = currImg.id
    }
    var meme = gMemes[id]
    return meme
}

function changeLineHeight(status) {
    var currMeme = getCurrMeme()
    if (status === '+' ) {
        if(currMeme.txts.height === 50) return;
        renderCanvas()
        currMeme.txts.height -= 50
        renderText(lastText)

    }
    else {
        if(currMeme.txts.height === 450) return;
        renderCanvas()
        currMeme.txts.height += 50
        renderText(lastText)

    }
}

function colorChange(color){
    $('.curr-color').text(color)
   var currMeme= getCurrMeme()
   currMeme.txts.color=color
   renderText()

}
function fontChange(fontSize){
    $('.font-size').text(fontSize)
    var currMeme= getCurrMeme()
    currMeme.txts.size=fontSize
    renderCanvas()
    renderText()
 
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL()
    console.log(gCanvas.toDataURL())   
    elLink.download = 'meme.jpg'
    var newWindow = window.open(elLink.href, '_blank');
    newWindow.focus();

}