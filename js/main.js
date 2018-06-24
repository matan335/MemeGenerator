'use strict';
var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');
var lastTextLength = [0];
var lastText=[];
var gLineNum = 0;
var COUNT_KEY = 'key-searched-count';
var selectedKeywordsMap=[
    {id:0,keyword:'happy',size:20},
    {id:1,keyword:'angry',size:70},
    {id:2,keyword:'awkward',size:50},
]

var gImgs = [
    { id: 0, url: 'img/img11.jpg', keywords: ['Happy', 'Funny','Politics'] },
    { id: 1, url: 'img/19.jpg', keywords: ['Angry'] },
    { id: 2, url: 'img/9.jpg', keywords: ['Funny'] },
    { id: 3, url: 'img/003.jpg', keywords: ['Angry','Politics'] },
    { id: 4, url: 'img/drevil.jpg', keywords: ['Funny'] },
    { id: 5, url: 'img/004.jpg', keywords: ['Cute','Animals'] },
    { id: 6, url: 'img/2.jpg', keywords: ['Happy'] },
    { id: 7, url: 'img/005.jpg', keywords: ['Cute','Animals'] },
    { id: 8, url: 'img/5.jpg', keywords: ['Cute','Badass'] },
    { id: 9, url: 'img/006.jpg', keywords: ['Cute','Animals'] },
    { id: 10, url: 'img/8.jpg', keywords: ['Happy','Badass'] },
    { id: 11, url: 'img/12.jpg', keywords: ['Funny'] },
    { id: 12, url: 'img/Ancient-Aliens.jpg', keywords: ['Funny','Badass'] },
    { id: 13, url: 'img/img2.jpg', keywords: ['Funny','Cute','Happy'] },
    { id: 14, url: 'img/img4.jpg', keywords: ['Funny','Angry','Politics'] },
    { id: 15, url: 'img/img5.jpg', keywords: ['Funny','Cute'] },
    { id: 16, url: 'img/img6.jpg', keywords: ['Funny','Cute','Happy','Animals'] },
    { id: 17, url: 'img/leo.jpg', keywords: ['Badass','Happy'] },
    { id: 18, url: 'img/meme1.jpg', keywords: ['Badass'] },
    { id: 19, url: 'img/One-Does-Not-Simply.jpg', keywords: ['Badass','Funny'] },
    { id: 20, url: 'img/Oprah-You-Get-A.jpg', keywords: ['Funny'] },
    { id: 21, url: 'img/patrick.jpg', keywords: ['Funny','Happy'] },
    { id: 22, url: 'img/putin.jpg', keywords: ['Funny','Politics'] },
    { id: 23, url: 'img/X-Everywhere.jpg', keywords: ['Cute'] },
    { id: 23, url: 'img/img12.jpg', keywords: ['awkward'] },
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

function init() {
    renderMemeGallery(gImgs);
    renderTagsContainer();
}




