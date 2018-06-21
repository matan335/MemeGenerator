var gCurrMeme;
var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');
var lastTextLength =[0];
var lastText=[];
var gLineNum=0;
var gImgs = [
    { id: 0, url: 'img/img11.jpg', keywords: ['Happy', 'Funny'] },
    { id: 1, url: 'img/19.jpg', keywords: ['Angry'] },
    { id: 2, url: 'img/9.jpg', keywords: ['Funny'] },
    { id: 3, url: 'img/003.jpg', keywords: ['Angry'] },
    { id: 4, url: 'img/drevil.jpg', keywords: ['Funny'] },
    { id: 5, url: 'img/004.jpg', keywords: ['Funny'] },
    { id: 6, url: 'img/img12.jpg', keywords: ['Akward'] },
];
var gMeme = {
    selectedImgId: 0,
    txts:
    [{
        line: '',
        size: 65,
        align: 'left',
        textStart:50,
        color: 'White',
        height: 70,
        shadow:false,
        font:'Impact'

    }]
};

function init() {
    renderMemeGallery(gImgs);
};




