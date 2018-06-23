'use strict';
function renderMemeGallery(imgs) {
    var elGallery = $('.container');
    var renderMemesImgs = imgs.map(function (img) {

        return `
                  <div onclick="renderEditor(${img.id})" class="hexagon" style="background-image: url('${img.url}')">
                    <div class="hexTop"></div>
                    <div class="hexBottom"></div>
                </div>`;

    });
    elGallery.html(renderMemesImgs);
};

function clearGallery() {
    return $('.container').html('');
}

function renderEditor(selectedImgId) {
    window.scrollTo(0, 0);
    hideAndShow('container', 'editor');
    hideAndShow('meme-filter');
    hideAndShow('search-container')
    hideAndShow('selected-keywords')
    gMeme.selectedImgId = selectedImgId;
    renderCanvas(selectedImgId);
}

function renderCanvas(selectedImgId) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var imgUrl = gImgs[selectedImgId].url;
    var canvasImg = new Image();
    canvasImg.src = imgUrl;
    var imgWidth = canvasImg.naturalWidth;
    var imgHeight = canvasImg.naturalHeight;
    var imgRatio = 600 / imgWidth;
    imgHeight = imgHeight * imgRatio
    gCanvas.height = imgHeight
    gCtx.drawImage(canvasImg, 0, 0, 600, imgHeight);
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

function backToGallery() {
    lastTextLength = [0];
    lastText = [];
    gLineNum = 0;
    resetMeme();
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
    $('.meme-lines').html(  
    `  
    <div class="text-line-0 line-container">
    Plese type
     <button class="btn danger-btn" onclick="deleteLine(0)">x</button>
     <input type="text" class="meme-text0" oninput="renderText(this.value)" onclick="changeLine(0)">
     </div>
    `)


};

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

function deleteLine(lineNum) {
    gMeme.txts[lineNum].line = '';
    gLineNum = lineNum
    renderText('')
    var selector = '.text-line-' + lineNum
    $(selector).remove()
}

function sumbit() {
    var mailContent = $('.mail-control').val()
    var subContent = $('.sub-control').val()
    var textContent = $('.form-control').val()
    window.location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to=${mailContent}&su=${subContent}&body=${textContent}`)
}

function renderFilteredGallery(filterBy) {
    if (!filterBy) {
        renderMemeGallery(gImgs)
        return;
    }

    filterBy = filterBy.toLowerCase();
    var filteredImages = [];
    var isAdded = false;
    gImgs.forEach(function (item) {
        item.keywords.forEach(function (keyword) {
            if (keyword.toLowerCase().includes(filterBy)) {
                filteredImages.push(item);
                var count = loadFromStorage(COUNT_KEY);
                if (!count && !isAdded) {
                    count = [keyword].reduce(function (acc, item) {
                        if (!acc[item]) acc[item] = 1;
                        else acc[item] += 1;
                        isAdded = true;
                        return acc;
                    }, {})
                    saveToStorage(COUNT_KEY, count);
                } else {
                    if (isAdded) return;
                    if (!count[keyword]) count[keyword] = 1;
                    else count[keyword] += 1;
                    saveToStorage(COUNT_KEY, count);
                    isAdded = true;
                }
            }
        })
    })
    renderMemeGallery(filteredImages);
}

function renderTagsContainer() {
    var tagsContainer = $('.selected-keywords');
    var all = `<div class="search-key all" onclick="renderFilteredGallery('')">All</div>`;
    tagsContainer.append(all);
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keyword) {
            var elKeyword = $(`.${keyword}`);
            if (elKeyword.length) {
                var fontSize =  (window.innerWidth >1000)? parseInt(elKeyword.css('font-size')) + 7:  (window.innerWidth >620)? parseInt(elKeyword.css('font-size')) + 5 : parseInt(elKeyword.css('font-size'))+2.5;
                elKeyword.css('font-size', fontSize + 'px');
                return;
            }
            var strHtml = `<div style="font-size: 20px;" class="search-key ${keyword}" onclick="renderFilteredGallery('${keyword}')">${keyword}</div>`;
            tagsContainer.append(strHtml);
        })
    });

  
}



