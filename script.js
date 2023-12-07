let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let wordCountDiv = document.getElementById("word-count");

let fontList = [
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Avant Garde",
    "Brush Script MT",
    "Bookman Old Style",
    "Calibri",
    "Cambria",
    "Candara",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Comic Sans",
    "Comic Sans MS",    
    "Consolas",
    "Courier New",
    "Cursive",
    "Fantasy",
    "Gadget",
    "Geneva",
    "Gill Sans",
    "Gill Sans MT",
    "Gill Sans MT Condensed",
    "Gill Sans Ultra Bold",
    "Gill Sans Ultra Bold Condensed",
    "Goudy Old Style",
    "Garamond",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida",
    "Lucida Bright",
    "Lucida Console",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Unicode",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trebuchet",
    "Trebuchet MS",
    "Verdana",
    "Webdings",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",


];

const updateWordCount = () => {
    let text = writingArea.innerText.trim();
    let words = text.split(/\s+/).filter(function(n) {return n!= ''});
    wordCountDiv.innerText = `Word count: ${words.length}`;
};

writingArea.addEventListener("keyup", updateWordCount);
writingArea.addEventListener("input", updateWordCount);

document.getElementById("saveDocument").addEventListener("click", function() {
    let defaultFilename = getDefaultFilename();
    let userFilename = prompt("Enter a filename:", defaultFilename);
    if (userFilename) {
        const text = writingArea.innerHTML;
        const filename = userFilename.endsWith('.txt') ? userFilename : userFilename + '.txt';
        downloadFile(filename, text);
        alert("File saved successfully!");
    }
});


function getDefaultFilename() {
    let text = writingArea.innerText.trim();
    let words = text.split(/\s+/);
    let firstFewWords = words.slice(0, 5).join(" ");
    firstFewWords = firstFewWords.replace(/[^a-zA-Z0-9]/g, "_"); // Sanitize for filename
    return firstFewWords || "document";
}


function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById("pageColor").addEventListener("input", function(e) {
    const color = e.target.value;
    document.getElementById("text-input").style.backgroundColor = color;
});

document.addEventListener('DOMContentLoaded', updateWordCount);
const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = intializer();