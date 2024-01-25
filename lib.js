//SIDEBAR OPTIONS
const homeOption = document.getElementById('home-option');
const collectionsOption = document.getElementById('collections-option');
const toReadOption = document.getElementById('to-read-option');
const readOption = document.getElementById('read-option');
const favouritesOption = document.getElementById('favourites-option');


//type-section-options
const allBooksOption = document.querySelector('.all-books-section');
const fictionOption = document.querySelector('.fiction-section');
const nonFictionOption = document.querySelector('.non-fiction-section');

const optionSectionsAfter = document.querySelectorAll('.type-after-span');

//Buttons
const addButton = document.getElementById('add-type-section-btn');
const submitButton = document.querySelector('.submit-btn');
const addBookSection = document.querySelector('.add-book-section');


//variables
let isSubmitButtonListenerAdded = false;
let currentNavOption = 'Home';
let BOOK_ID = 1;

//Book Interactions
const favouriteButton = document.getElementsByClassName('book-fav');

const toReadButton = document.getElementsByClassName('to-read-button');
const readButton = document.getElementsByClassName('read-button');

//ARRAYS
const library = []; //holds all the books (objects)
const folders = []; //holds arrays of objects (each folder will be an array of books)

//Input
const bookNameInput = document.querySelector('.name-input');
const authorNameInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');

const radios = document.querySelectorAll('input[name="book_type"]');

//rendering section
const allBooksSection = document.querySelector('.all-books');
const bookOptionsSection = document.querySelector('.book-options');

//functions

function checkForRadioButtons(){
    let radioValue;
    for(const radioButton of radios){
        if(radioButton.checked){
            radioValue = radioButton.value;
            break;
        }
    }
    return radioValue;
}

function onSubmitButton(){
    const radioButtonValue = checkForRadioButtons();
    addBookToLibrary(radioButtonValue);
    renderBook();
    BOOK_ID++;
    resetForm();
    console.log(library)
}


function renderBookForOptions(bookName_, authorName_ , pages_){
    const book = document.createElement('div');
    book.classList.add('book');

    // Create elements for book details
    const bookName = document.createElement('p');
    bookName.classList.add('book-name');
    bookName.innerText = `${bookName_}`;

    const authorName = document.createElement('p');
    authorName.classList.add('author-name');
    authorName.innerText = `${authorName_}`;

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.innerText = `Pages: ${pages_}`;


    book.appendChild(bookName);
    book.appendChild(authorName);
    book.appendChild(pages);

    bookOptionsSection.appendChild(book);
}

function renderBook(){
    const book = document.createElement('div');
    book.classList.add('book');

    const bookID = BOOK_ID;

    // Create elements for book details
    const bookName = document.createElement('p');
    bookName.classList.add('book-name');
    bookName.innerText = `${bookNameInput.value}`;

    const authorName = document.createElement('p');
    authorName.classList.add('author-name');
    authorName.innerText = `${authorNameInput.value}`;

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.innerText = `Pages: ${pagesInput.value}`;

    // Create elements for status
    const status = document.createElement('div');
    status.classList.add('status');

    const statusText = document.createElement('p');
    statusText.innerText = 'Status';

    const statusIcon = document.createElement('i');
    statusIcon.classList.add('.book-status-btn','bx', 'bx-chevron-down');
    statusIcon.addEventListener('click', () => {
        statusButtonClicked(statusIcon);
    });

    const statuses = document.createElement('div');
    statuses.classList.add('statuses');

    const readButton = document.createElement('i');
    readButton.classList.add('bx', 'bx-check', 'read-button');
    readButton.addEventListener('click', e => {
       readButtonClicked(readButton, bookName, bookID, e); 
    });

    const toReadButton = document.createElement('i');
    toReadButton.classList.add('bx', 'bx-time-five', 'to-read-button');
    toReadButton.addEventListener('click', e => {
        toReadButtonClicked(toReadButton, bookName, bookID, e);
    });

    const favoriteIcon = document.createElement('i');
    favoriteIcon.classList.add('bx', 'bxs-star', 'book-fav');
    favoriteIcon.addEventListener('click', () => {
        favoriteButtonClicked(favoriteIcon, bookName, bookID);
    })



    // Append status elements to the status container
    status.appendChild(statusText);
    status.appendChild(statusIcon);
    status.appendChild(statuses);
    statuses.appendChild(readButton);
    statuses.appendChild(toReadButton);

    book.appendChild(bookName);
    book.appendChild(authorName);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(favoriteIcon);

    allBooksSection.appendChild(book);
}


class Book {
    constructor(id, name, author, pages, status, favourite, read, type) {
        this.id = id;
        this.name = name; 
        this.author = author; 
        this.pages = pages; 
        this.status = status;
        this.favourite = favourite;
        this.read = read;
        this.type = type;
        this['to-read'] = false; 
    }
}

function addBookToLibrary(radioButtonValue) {
    const bookObj = new Book(BOOK_ID, bookNameInput.value, authorNameInput.value, pagesInput.value, false, false, false, radioButtonValue);

    library.push(bookObj);
}



//FORM OF THE BOOK---------------------------
function resetForm(){
    addBookSection.style.display = 'none';
    bookNameInput.value = '';
    authorNameInput.value = '';
    pagesInput.value = '';
}

function onCloseAddBookSection() {
    addBookSection.style.display = 'none';

    if (isSubmitButtonListenerAdded) {
        submitButton.removeEventListener('click', onSubmitButton);
        isSubmitButtonListenerAdded = false;
    }
}
//-----------------------------------------




//STATUS OF THE BOOK IS CLICKED-----------------------------
function statusButtonClicked(statusIcon){
    if (statusIcon.classList.contains('bx-chevron-down')) {
        statusIcon.classList.remove('bx-chevron-down');
        statusIcon.classList.add('bx-chevron-up');
        const statusesContainer = statusIcon.nextElementSibling; 
        statusesContainer.style.cssText = 'display: flex; flex-direction: column;';
    }
    else
    {
        statusIcon.classList.add('bx-chevron-down');
        statusIcon.classList.remove('bx-chevron-up');
        const statusesContainer = statusIcon.nextElementSibling; 
        statusesContainer.style.cssText = 'display: none';
    }
}
//-------------------------------------------------------




// READ THE BOOK-------------------------------------------
function readButtonClicked(readButton, bookName, bookID, e) {
    const computedStyle = getComputedStyle(readButton);
    if (computedStyle.color !== 'rgb(21, 128, 61)') {
        readButton.style.color = '#15803d';
    } else {
        readButton.style.color = 'black';
    }

    bookRead(bookName, bookID, e);
}

function bookRead(bookName, bookID, e) {
    const bookIndex = library.findIndex(book => book.name === bookName.innerText && book.id === bookID);
    if (bookIndex !== -1) {
        if (library[bookIndex].read === true) {
            library[bookIndex].read = false;
        } else {
            library[bookIndex].read = true;

            // Access the parent element of the clicked button
            const buttonClickedParent = e.currentTarget.parentNode;

            // Find the to-read button within the parent element
            const toReadButton = buttonClickedParent.querySelector('.to-read-button');
            
            if (toReadButton.style.color !== 'black') {
                toReadButton.style.color = 'black';
                library[bookIndex]['to-read'] = false;
            }
        }
    }
}
//----------------------------------------------------


//to read the book--------------------------------

function toReadButtonClicked(toReadButton, bookName, bookID, e){
    const computedStyle = getComputedStyle(toReadButton);
    if(computedStyle.color !== 'rgb(91, 33, 182)')
        toReadButton.style.color = '#5b21b6';
    else
        toReadButton.style.color = 'black';

    bookToRead(bookName, bookID, e);
}

function bookToRead(bookName, bookID, e){
    const bookIndex = library.findIndex(book => book.name === bookName.innerText && book.id === bookID);
    if(bookIndex !== -1){
        if (library[bookIndex]['to-read'] === true) {
            library[bookIndex]['to-read'] = false;
        } else {
            library[bookIndex]['to-read'] = true;

            // Access the parent element of the clicked button
            const buttonClickedParent = e.currentTarget.parentNode;

            // Find the to-read button within the parent element
            const readButton = buttonClickedParent.querySelector('.read-button');
            
            if (readButton.style.color !== 'black') {
                readButton.style.color = 'black';
                library[bookIndex].read = false;
            }
        }
    } 

}


//favorite the book
function favoriteButtonClicked(favoriteIcon, bookName, bookID){
    const computedStyle = getComputedStyle(favoriteIcon);
    if(computedStyle.color !== 'rgb(185, 28, 28)')
        favoriteIcon.style.color = '#b91c1c';
    else
        favoriteIcon.style.color = 'black';

    bookFav(bookName, bookID);
}

function bookFav(bookName, bookID){
    const bookIndex = library.findIndex(book => book.name === bookName.innerText && book.id === bookID);
    if(bookIndex !== -1){
        library[bookIndex].favourite = !library[bookIndex].favourite;
    } 
}

function deleteBooksFromRenderView(){
    allBooksSection.style.display = 'none';
    while (bookOptionsSection.firstChild) {
        bookOptionsSection.removeChild(bookOptionsSection.firstChild);
    }
}

function showOptions(){
    fictionOption.style.display = 'block';
    nonFictionOption.style.display = 'block';
}

function showOptionsSection(){
    bookOptionsSection.style.cssText = 'display: flex; flex-direction: column;';
}

function hideOptions(){
    fictionOption.style.display = 'none';
    nonFictionOption.style.display = 'none';
}

function removeOptionsStyles(){
    allBooksOption.style.color = 'gray';
    fictionOption.style.color = 'gray';
    nonFictionOption.style.color = 'gray';
    
    optionSectionsAfter.forEach(optionAfter => {
        optionAfter.style.cssText = 'width: 0;'
    });
}

function addOptionsStyles(option){
    option.style.color = '#042f2e';
    option.lastElementChild.style.cssText = 'width: 100%';
}

function removeSideBarOptionStyles(){
    homeOption.style.color = 'white';
    homeOption.style.background = '#042f2e';
    collectionsOption.style.color = 'white';
    collectionsOption.style.background = '#042f2e';
    toReadOption.style.color = 'white';
    toReadOption.style.background = '#042f2e';
    readOption.style.color = 'white';
    readOption.style.background = '#042f2e';
    favouritesOption.style.color = 'white';
    favouritesOption.style.background = '#042f2e';
}

function addSideBarOptionStyles(option){
    option.style.color = '#042f2e';
    option.style.background = 'white';
}

function libraryLoopForFictionOption(property1, property2){
    library.forEach(book => {
        if(book[`${property1}`] === true && book[`${property2}`] === 'fiction')
            renderBookForOptions(book.name, book.author, book.pages);
    });
}

function libraryLoopForNonFictionOption(property1, property2){
    library.forEach(book => {
        if(book[`${property1}`] === true && book[`${property2}`] === 'non-fiction')
            renderBookForOptions(book.name, book.author, book.pages);
    });
}

function libraryForAllBookOptions(property1){
    library.forEach(book => {
        if(book[`${property1}`] === true)
            renderBookForOptions(book.name, book.author, book.pages);
    });
}

//event listeners
addButton.addEventListener('click', () => {
    addBookSection.style.display = 'flex';

    //add close action
    const closeAddBookSection = document.querySelector('.closeAddBookSetion');
    closeAddBookSection.addEventListener('click', onCloseAddBookSection);


    if (!isSubmitButtonListenerAdded) {
        submitButton.addEventListener('click', onSubmitButton);
        isSubmitButtonListenerAdded = true;
    }
});


homeOption.addEventListener('click', () => {
    removeSideBarOptionStyles();
    addSideBarOptionStyles(homeOption);
    allBooksSection.style.cssText = 'display: flex; flex-direction: column;';
    bookOptionsSection.style.display = 'none';
    addButton.style.display = 'block';
    hideOptions();

    currentNavOption = 'Home';
});

favouritesOption.addEventListener('click', () => {
    removeSideBarOptionStyles();
    addSideBarOptionStyles(favouritesOption);
    deleteBooksFromRenderView();
    showOptions();
    showOptionsSection();
    addButton.style.display = 'none';
    currentNavOption = 'Favourites';

    library.forEach(book => {
        if(book.favourite === true){
            renderBookForOptions(book.name, book.author, book.pages);
        }
    });
});

toReadOption.addEventListener('click', () => {
    removeSideBarOptionStyles();
    addSideBarOptionStyles(toReadOption);
    deleteBooksFromRenderView();
    showOptions();
    showOptionsSection();
    addButton.style.display = 'none';
    currentNavOption = 'To Read';

    library.forEach(book => {
        if(book['to-read'] === true){
            renderBookForOptions(book.name, book.author, book.pages);
        }
    });
});

readOption.addEventListener('click', () => {
    removeSideBarOptionStyles();
    addSideBarOptionStyles(readOption);
    deleteBooksFromRenderView();
    showOptions();
    showOptionsSection();
    addButton.style.display = 'none';
    currentNavOption = 'Read';

    library.forEach(book => {
        if(book.read === true){
            renderBookForOptions(book.name, book.author, book.pages);
        }
    });
});

let isCollectionsOptionClickable = true;

collectionsOption.addEventListener('click', () => {
    if (isCollectionsOptionClickable) {
        // Disable further clicks
        isCollectionsOptionClickable = false;

        collectionsOption.lastElementChild.innerText += ' (Soon)';

        setTimeout(() => {
            collectionsOption.lastElementChild.innerText = 'Collections';
            isCollectionsOptionClickable = true;
        }, 3000);
    }
});



fictionOption.addEventListener('click', () => {
    deleteBooksFromRenderView();
    removeOptionsStyles();
    addOptionsStyles(fictionOption);

    if(currentNavOption === 'Favourites')
        libraryLoopForFictionOption('favourite', 'type');
    else if(currentNavOption === 'To Read')
        libraryLoopForFictionOption('to-read', 'type');
    else if(currentNavOption === 'Read')
        libraryLoopForFictionOption('read', 'type');
    //add collections later

}); 

nonFictionOption.addEventListener('click', () => {
    deleteBooksFromRenderView();
    
    removeOptionsStyles();
    addOptionsStyles(nonFictionOption);
    

    if(currentNavOption === 'Favourites')
        libraryLoopForNonFictionOption('favourite', 'type');
    else if(currentNavOption === 'To Read')
        libraryLoopForNonFictionOption('to-read', 'type');
    else if(currentNavOption === 'Read')
        libraryLoopForNonFictionOption('read', 'type');
    //add collections later

}); 

allBooksOption.addEventListener('click', () => {
    deleteBooksFromRenderView();
    removeOptionsStyles();
    addOptionsStyles(allBooksOption);

    if(currentNavOption === 'Favourites')
        libraryForAllBookOptions('favourite');
    else if(currentNavOption === 'To Read')
        libraryForAllBookOptions('to-read');
    else if(currentNavOption === 'Read')
        libraryForAllBookOptions('read');
    //add collections later

});



