
function renderMemeGallery(imgs) {
    var elGallery = $('.container');
    var renderMemesImgs = imgs.map(function (img) {
        var renderMemeImg =
            `
         <img class="meme-img meme-${img.id}" src="${img.url}" onclick=renderEditor(${img.id})>
         `;
        return renderMemeImg;

    });
    elGallery.html(renderMemesImgs);
};
function clearGallery() {
    $('.container').html('')


}
function renderEditor(selectedImgId) {
    window.scrollTo(0, 0);
    hideAndShow('container', 'editor');
    hideAndShow('meme-filter');
    hideAndShow('search-container')
    hideAndShow('selected-keywords')
    gMeme.selectedImgId = selectedImgId;
    renderCanvas(gMeme.selectedImgId);
}


function renderCanvas(selectedImgId) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var canvasImg = document.querySelector('.meme-' + selectedImgId);
    var imgWidth = canvasImg.naturalWidth;
    var imgHeight = canvasImg.naturalHeight;
    var imgRatio = 600 / imgWidth;
    imgHeight = imgHeight * imgRatio
    gCanvas.height = imgHeight
    gCtx.drawImage(canvasImg, 0, 0, 600, imgHeight);
}




function hideAndShow(hide, show) {
    if (hide) $('.' + hide).addClass('hideContent');
    if (show) $('.' + show).removeClass('hideContent');

}

function renderText(txt) {
    gMeme.txts[gLineNum].line = txt
    renderCanvas(gMeme.selectedImgId);
    var NumofLines = gMeme.txts.length
    for (var i = 0; i < gMeme.txts.length; i++) {
        NumofLines--
        renderMeme(NumofLines)
    }
}

function renderMeme(lineNum) {
    var txt = gMeme.txts[lineNum].line
    var height = gMeme.txts[lineNum].height;
    var align = gMeme.txts[lineNum].textStart
    var fontSize = gMeme.txts[lineNum].size;
    var fontFamily = gMeme.txts[lineNum].font
    var fontStr = fontSize + 'px ' + fontFamily
    if (gMeme.txts[lineNum].shadow) {
        gCtx.shadowOffsetX = 3;
        gCtx.shadowOffsetY = 3;
        gCtx.shadowColor = "rgba(0,0,0,0.3)";
        gCtx.shadowBlur = 4;
    }
    gCtx.textAlign = gMeme.txts[lineNum].align;
    gCtx.fillStyle = gMeme.txts[lineNum].color;
    gCtx.font = fontStr;
    gCtx.fillText(txt, align, height);
    gCtx.strokeText(txt, align, height);
    lastText[lineNum] = txt;
    lastTextLength[lineNum] = txt.length;

}

function changeLinePos(status) {
    var textPos = gMeme.txts[gLineNum].textStart;
    if (status === '+') {
        if (gMeme.txts[gLineNum].height < 91) return;
        gMeme.txts[gLineNum].height -= 50;
        renderText(gMeme.txts[gLineNum].line);
    }
    else if (status === '-') {
        if (gMeme.txts[gLineNum].height > gCanvas.height - 80) return;
        gMeme.txts[gLineNum].height += 50;
        renderText(gMeme.txts[gLineNum].line);
    }
    else if (status === 'left') {
        if (textPos > 101) {
            textPos -= 50;
            gMeme.txts[gLineNum].textStart = textPos;
            renderText(gMeme.txts[gLineNum].line)
        }

    }
    else if (textPos < 550) {
        textPos += 50;
        gMeme.txts[gLineNum].textStart = textPos;
        renderText(gMeme.txts[gLineNum].line)
    }

}

function colorChange(color) {
    $('.curr-color').text(color);
    gMeme.txts[gLineNum].color = color;
    renderText(gMeme.txts[gLineNum].line);

}
function fontSizeChange(fontSize) {
    $('.font-size').text(fontSize);
    gMeme.txts[gLineNum].size = fontSize;
    renderCanvas(gMeme.selectedImgId);
    renderText(gMeme.txts[gLineNum].line);

}

function alignChange(align) {
    if (align === 'left') gMeme.txts[gLineNum].textStart = 70
    if (align === 'center') gMeme.txts[gLineNum].textStart = 300
    if (align === 'right') gMeme.txts[gLineNum].textStart = 550
    gMeme.txts[gLineNum].align = align
    renderCanvas(gMeme.selectedImgId)
    renderText(gMeme.txts[gLineNum].line);
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'meme.jpg';


}

function backToGallery() {
    lastTextLength = 0;
    lastText = [];
    gLineNum = 0;
    resetMeme();
    $('.meme-lines').html('Plese type <input type="text" class="meme-text0" oninput="renderText(this.value)" onclick="changeLine(0)">')
    hideAndShow('editor', 'container');
    hideAndShow('', 'meme-filter');
    hideAndShow('', 'search-container')
    hideAndShow('', 'selected-keywords')

}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        txts:
            [{
                line: '',
                size: 40,
                align: 'left',
                textStart: 50,
                color: 'White',
                height: 70,
                shadow: false,
                font: 'Impact'
            }]
    };
};
function changeLine(lineNum) {
    gLineNum = lineNum;
}
function addNewLine() {
    gMeme.txts.push(
        {
            line: '',
            size: 40,
            align: 'left',
            textStart: 50,
            color: 'White',
            height: getNewHeight(),
            shadow: false,
            font: 'impact'

        });

    var elLines = $('.meme-lines');
    var newElLines =
        `  
        <div class="text-line-${gMeme.txts.length - 1} line-container">
        your ${gMeme.txts.length} line:<button class="btn danger-btn" onclick="deleteLine(${gMeme.txts.length - 1})">x</button>
        <input type="text" class="meme-text${gMeme.txts.length - 1}" oninput="renderText(this.value)"  onclick="changeLine(${gMeme.txts.length - 1})">
        </div>
        `;
    elLines.append(newElLines);
}
function getNewHeight() {
    var newHeight;
    var lastHeight = gMeme.txts[gMeme.txts.length - 1].height
    if (lastHeight < 350) newHeight = lastHeight + 70;
    else newHeight = 70;
    return newHeight;

}
function filterChange(filter) {
    clearGallery()
    if (filter === 'All') {
        renderMemeGallery(gImgs);
        return;
    }
    var sortedImgs = gImgs.filter(function (img) {
        for (i = 0; i < gImgs.length; i++) {
            if (img.keywords[i] === filter) return img;
        }
    })
    renderMemeGallery(sortedImgs);
}
function toggleShadow() {
    var isShadow = gMeme.txts[gLineNum].shadow;
    if (!isShadow) gMeme.txts[gLineNum].shadow = true;
    else gMeme.txts[gLineNum].shadow = false;
    renderText(gMeme.txts[gLineNum].line)
}

function fontFamilyChange(fontStr) {
    gMeme.txts[gLineNum].font = fontStr;
    renderText(gMeme.txts[gLineNum].line)
    $('.curr-font-family').text(fontStr)


}

function deleteLine(line) {
    gMeme.txts[line].line = '';
    gLineNum = line
    renderText('')
    var selector = '.text-line-' + line
    $(selector).remove()


}
function sumbit() {
    var mailContent = $('.mail-control').val()
    var subContent = $('.sub-control').val()
    var textContent = $('.form-control').val()
    window.location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to=${mailContent}&su=${subContent}&body=${textContent}`)

}


function renderFilteredGallery(filterBy, isClick) {
    if (filterBy === '') {
        renderMemeGallery(gImgs)
        return;
    }
    var isFoundMatch = false;
    if (isClick) isFoundMatch = true;
    if (!filterBy) {
        var elKeywordsFilter = $('#filter');
        var filterBy = elKeywordsFilter.value
    }
    filterBy = filterBy.toLowerCase();
    var filteredImages = gImgs.filter(function (img) {
        var matchedImg = false;
        for (i = 0; i < img.keywords.length; i++) {
            var keywords = []
            var keywordStr = img.keywords[i]
            keywordStr = keywordStr.toLowerCase();
            keywords.push(keywordStr)
            if (keywordStr.includes(filterBy)) {
                matchedImg = true;
            }
            if (keywordStr === filterBy && !isFoundMatch) {

                isFoundMatch = true;
                var selector = '.' + keywordStr;
                if ($(selector).text() === keywordStr) {
                    var selectedKeyword = findFilterInModal(filterBy)
                    var currkeywordText = selectedKeyword[0].keyword
                    var currkeywordSize = selectedKeyword[0].size
                    currkeywordSize = +currkeywordSize;
                    var newSize = (currkeywordSize + 10)
                    $(selector).css('font-size', newSize + 'px');
                    selectedKeywordsMap[selectedKeyword[0].id].keyword = currkeywordText
                    selectedKeywordsMap[selectedKeyword[0].id].size = newSize

                }
                else {
                    var selectedKeyword = findFilterInModal(filterBy)
                    if (!selectedKeyword[0]) {
                        var txt = filterBy;
                        var size = 20;
                        var currkeyword = {'id':selectedKeywordsMap.length,'keyword': txt, 'size':size }
                        selectedKeywordsMap.push(currkeyword)
                    }
                    else{
                        var txt=selectedKeyword[0].keyword
                        var size=selectedKeyword[0].size
                    }

                }
                debugger;

                $(selector).html(txt);
                $(selector).css('font-size',size + 'px')
                saveToStorage(KeyForStorage, selectedKeywordsMap)
            }
        }
        return matchedImg
    })
    renderMemeGallery(filteredImages);
}
function findFilterInModal(currFilter) {
    var foundKeyword = selectedKeywordsMap.filter(function (keyword) {
        return (keyword.keyword === currFilter)
    })
    return foundKeyword
}

function renderselectedKeywords() {
    selectedKeywordsMap.map(function (keyword) {
        renderFilteredGallery(keyword.keyword)
    });
    renderMemeGallery(gImgs)

}