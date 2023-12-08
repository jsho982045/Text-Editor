let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let wordCountDiv = document.getElementById("word-count");
const documentTitleDiv = document.getElementById("document-title");

let lastSavedContent = writingArea.innerHTML;
let currentFilename = ''; // This will store the current filename for auto-saving
let originalTitle = '';

function updateDocumentTitle(title) {
    if (title) {
        documentTitleDiv.innerText = title;
        currentFilename = title + '.txt'; // Update the current filename
    } else {
        documentTitleDiv.innerText = 'New Document';
    }
}

document.getElementById("newPage").addEventListener("click", function() {
    // Open a new tab with the same editor page
    window.open(window.location.href, '_blank');
});

// Drawer toggle function
document.getElementById('toggleDrawer').addEventListener('click', function() {
    var toolbarContainer = document.getElementById('toolbarContainer');
    if (toolbarContainer.classList.contains('toolbar-opened')) {
        toolbarContainer.classList.remove('toolbar-opened');
        toolbarContainer.classList.add('toolbar-closed');
        adjustTextInputPadding(true); // Add padding when toolbar is closed
    } else {
        toolbarContainer.classList.remove('toolbar-closed');
        toolbarContainer.classList.add('toolbar-opened');
        adjustTextInputPadding(false); // Remove padding when toolbar is open
    }
});

function adjustTextInputPadding(toolbarClosed) {
    const textInput = document.getElementById("text-input");
    textInput.style.paddingTop = toolbarClosed ? '50px' : '2'; // Toggle padding based on toolbar state
}

// Function to update delete button visibility
function updateDeleteButtonVisibility() {
    const deleteButton = document.getElementById("deleteDocument");
    if (currentFilename) {
        deleteButton.style.display = 'block'; // Show button if a file is saved
    } else {
        deleteButton.style.display = 'none'; // Hide button if no file is saved
    }
}
updateDeleteButtonVisibility();




// When resetting to a new document, call updateDeleteButtonVisibility
function resetToNewDocument() {
    writingArea.innerHTML = ''; // Clear the content
    currentFilename = ''; // Reset the filename
    updateDocumentTitle('New Document'); // Reset the title
    updateDeleteButtonVisibility(); // Hide the delete button
}




// The delete button click event
document.getElementById("deleteDocument").addEventListener("click", function() {
    var confirmation = confirm("Are you sure you want to delete this file?");
    if (confirmation) {
        resetToNewDocument(); // Reset the editor for a new document
        alert("File deleted successfully.");
    }
});

// Event listeners for the document title
documentTitleDiv.addEventListener("focus", function() {
    // Save the current title when the user starts editing
    originalTitle = documentTitleDiv.innerText;
});

documentTitleDiv.addEventListener("blur", function() {
    // When user clicks away, update the title and filename if changed
    if (documentTitleDiv.innerText !== originalTitle) {
        updateDocumentTitle(documentTitleDiv.innerText);
    }
});

const updateWordCount = () => {
    let text = writingArea.innerText.trim();
    let words = text.split(/\s+/).filter(function(n) {return n != ''});
    wordCountDiv.innerText = `Word count: ${words.length}`;
};

writingArea.addEventListener("keyup", updateWordCount);
writingArea.addEventListener("input", updateWordCount);

document.getElementById("saveDocument").addEventListener("click", function() {
    let userFilename = prompt("Enter a filename:", getDefaultFilename());
    if (userFilename) {
        currentFilename = userFilename.endsWith('.txt') ? userFilename : userFilename + '.txt';
        updateDocumentTitle(userFilename);
        saveDocument(currentFilename);
    }
});

function saveDocument(filename) {
    const text = writingArea.innerHTML;
    downloadFile(filename, text);
    lastSavedContent = writingArea.innerHTML; // Update the last saved content
    currentFilename = filename; // Update the current filename
    alert("File saved successfully!");
    updateDeleteButtonVisibility();
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        if (currentFilename) {
            saveDocument(currentFilename);
        } else {
            let userFilename = prompt("Enter a filename:", getDefaultFilename());
            if (userFilename) {
                currentFilename = userFilename.endsWith('.txt') ? userFilename : userFilename + '.txt';
                updateDocumentTitle(userFilename);
                saveDocument(currentFilename);
            }
        }
    }
});

function getDefaultFilename() {
    let text = writingArea.innerText.trim();
    let words = text.split(/\s+/);
    let firstFewWords = words.slice(0, 5).join(" ");
    firstFewWords = firstFewWords.replace(/[^a-zA-Z0-9]/g, "_");
    return firstFewWords || "NewDocument";
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

document.addEventListener('DOMContentLoaded', function() {
    updateWordCount();

    // Populate the font list
    // Insert your font list here
    // Example: fontList.forEach(font => { /* add each font to fontName select element */ });

    let fontList = [
        "Arial",
        "Arial Black",
        "Arial Narrow",
        "Arial Rounded MT Bold",
        "Avant Garde",
        "Bookman Old Style",
        "Brush Script MT",
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
        "Garmond",
        "Geneva",
        "Georgia",
        "Gill Sans",
        "Gill Sans MT",
        "Gill Sans MT Condensed",
        "Gill Sans Ultra Bold",
        "Gill Sans Ultra Bold Condensed",
        "Goudy Old Style",
        "Helvetica",
        "Helvetica Neue",
        "Impact",
        "Lucida",
        "Lucida Bright",
        "Lucida Console",
        "Lucida Handwriting",
        "Lucida Sans",
        "Lucida Sans Unicode",
        "Monaco",
        "Monospace",
        "Microsoft Sans Serif",
        "New Century Schoolbook",
        "Open Sans",
        "Open Sans Condensed",
        "Optima",
        "Palatino",
        "Palatino Linotype",
        "Papyrus",
        "sans-serif",
        "sans-serif-black",
        "sans-serif-condensed",
        "sans-serif-light",
        "sans-serif-medium",
        "sans-serif-thick",
        "sans-serif-thin",
        "Segoe",
        "Segoe Print",
        "Segoe Script",
        "Segoe UI",
        "Segoe UI Light",
        "Segoe UI Semibold",
        "Segoe UI Symbol",
        "sarif",
        "serif",
        "serif-black",
        "serif-condensed",
        "serif-light",
        "serif-medium",
        "serif-thick",
        "serif-thin",
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
        "Zapf Dingbats",
        "Zapfino",
    ];

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
});

// Define highlighter functions here
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

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});


const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};
``
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


function initializer() {
    // Initialize any other features here if needed
}

initializer(); // Call the initializer function to set things up