const spinner = document.getElementById('spinner');
const apiUrl = "https://api.unsplash.com/";
const headers = {"Authorization": "Client-ID hkyyTkyzmSESSYel3hlBCKQbqgP4LdK255Xg9szNkVA"};
const image_container = document.getElementById('image-container');
const number_of_images_to_load = 15;

let canLoadMorePictures = true;
let numberOfLoadedImages = 0;

/**
 * Spinner Controll
 */

function loadingMorePictures(){
    spinner.style.visibility = "visible";
}

function doneLoadingPictures(){
    spinner.style.visibility = "hidden";
}

/**
 * Image loaded count
 */
function imageLoaded(){
    console.log("loaded!");
    if(++numberOfLoadedImages == number_of_images_to_load){
        canLoadMorePictures = true;
        numberOfLoadedImages = 0;
        console.log("ready");
    }

}


//////////////////////////////////

function addImageToDocument(image){
    let href_elem = document.createElement('a');
    href_elem.setAttribute('href', image.links.html);
    href_elem.setAttribute('target', '_blank');

    let image_elem = document.createElement('img');
    image_elem.setAttribute("src", image.urls.raw);
    image_elem.onload = imageLoaded();
    if(image.description != null){
        image_elem.setAttribute("title", image.description);
    }
    href_elem.append(image_elem);
    image_container.append(href_elem);
}


async function loadMorePictures(numberOfPicturesToLoad){
    canLoadMorePictures = false;
    loadingMorePictures();
    
    const response = await fetch(`${apiUrl}/photos/random?count=${numberOfPicturesToLoad}`, {headers: headers});
    const data = await response.json();
    console.log(data);
    for(image of data){
        addImageToDocument(image);
    }

    doneLoadingPictures();
}

document.body.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 1000 && canLoadMorePictures) {
        // you're at the bottom of the page
        loadMorePictures(number_of_images_to_load);
    }
}

loadMorePictures(number_of_images_to_load);

