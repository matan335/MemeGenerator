var gCurrMeme;
var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');
var lastTextLength =[0];
var lastText=[];
var gLineNum=0;
var KeyForStorage='key-searched-options'
var selectedKeywordsMap=[
    {id:0,keyword:'happy',size:20},
    {id:1,keyword:'angry',size:70},
    {id:2,keyword:'awkward',size:50},
]

var gImgs = [
    { id: 0, url: 'img/img11.jpg', keywords: ['Happy', 'Funny'] },
    { id: 1, url: 'img/19.jpg', keywords: ['Angry'] },
    { id: 2, url: 'img/9.jpg', keywords: ['Funny'] },
    { id: 3, url: 'img/003.jpg', keywords: ['Angry'] },
    { id: 4, url: 'img/drevil.jpg', keywords: ['Funny'] },
    { id: 5, url: 'img/004.jpg', keywords: ['Funny'] },
    { id: 6, url: 'img/img12.jpg', keywords: ['Awkward'] },
];
var gMeme = {
    selectedImgId: 0,
    txts:
    [{
        line: '',
        size: 40,
        align: 'left',
        textStart:50,
        color: 'White',
        height: 70,
        shadow:false,
        font:'Impact'

    }]
};

function init(){
    renderMemeGallery(gImgs);
    if(loadFromStorage(KeyForStorage)) selectedKeywordsMap=(loadFromStorage(KeyForStorage))
    renderselectedKeywords()

}




