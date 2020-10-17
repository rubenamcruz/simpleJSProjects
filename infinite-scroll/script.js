const spinner = document.getElementById('spinner');
const apiUrl = "https://api.unsplash.com/";
const headers = {"Authorization": "Client-ID hkyyTkyzmSESSYel3hlBCKQbqgP4LdK255Xg9szNkVA"};
const image_container = document.getElementById('image-container');

/**
 * Spinner Controll
 */

function loadingMorePictures(){
    spinner.style.visibility = "visible";
}

function doneLoadingPictures(){
    spinner.style.visibility = "hidden";
}


//////////////////////////////////

function addImageToDocument(image){
    let href_elem = document.createElement('a');
    href_elem.setAttribute('href', image.links.html);
    href_elem.setAttribute('target', '_blank');

    let image_elem = document.createElement('img');
    image_elem.setAttribute("src", image.urls.raw);
    if(image.description != null){
        image_elem.setAttribute("title", image.description);
    }
    href_elem.append(image_elem);
    image_container.append(href_elem);
}


async function loadMorePictures(numberOfPicturesToLoad){
    loadingMorePictures();
    
    const response = await fetch(`${apiUrl}/photos/random?count=${numberOfPicturesToLoad}`, {headers: headers});
    const data = await response.json();
    console.log(data);
    for(image of data){
        addImageToDocument(image);
    }

    doneLoadingPictures();
}

let response = loadMorePictures(5);