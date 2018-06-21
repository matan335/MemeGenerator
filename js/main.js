var gCurrMeme;
var gCanvas=document.querySelector('.canvas')
var gCtx= gCanvas.getContext('2d');
var lastTextLength=0;
var lastText;
var gImgs = [
    { id: 0, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/9.jpg', keywords: ['funny'] },

];
var gMemes = [ {
    selectedImgId: 0,
    txts: 
        {
            line: '',
            size: 20,
            align: 'left',
            color: 'Black',
            height:50

        }
    },
    {
   
    selectedImgId: 1,
    txts:
        {
            line: '',
            size: 20,
            align: 'left',
            color: 'Black',
            height:50
        }
    },
    {
    selectedImgId: 2,
    txts: 
        {
            line: '',
            size: 20,
            align: 'left',
            color: 'white',
            height:50
        }
    },

]

function init(){
    renderMemeGallery()
}


function renderMemeGallery() {
    var elGallery = $('.container')
    var renderMemesImg = gMemes.map(function (meme){
        var renderMemeImg =
            `
         <img class="meme-img meme-${meme.selectedImgId}" src="${gImgs[meme.selectedImgId].url}" onclick=renderEditor(${meme.selectedImgId})>
         `
        return renderMemeImg;

    });
    renderMemesImg = renderMemesImg.join('');
    elGallery.html(renderMemesImg);
}


