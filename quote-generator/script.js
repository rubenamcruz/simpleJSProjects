//Get Quote From API
const quote = document.getElementById("quote");
const quote_container = document.getElementById("quote-container");
const author = document.getElementById("author");
const loader = document.getElementById('loader');

async function getQuote() {
    const apiUrl = 'http://localhost:3000/api/quote';
    loading();
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        quote.innerText = data.quoteText;
        if(data.quoteAuthor === null || data.quoteAuthor === ''){
            author.innerText = "unknown";
        }else{
            author.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 100){
            quote.classList.add("long-quote");
        }else{
            quote.classList.remove("long-quote");
        }
    }catch(error){
        console.log("Error: " + error);
    }finally{
        loaded();
    }
}

function loading(){
    loader.hidden = false;
    quote_container.hidden = true;
}


function loaded(){
    loader.hidden = true;
    quote_container.hidden = false;
}

function tweetQuote(){
    let quoteText = quote.innerText;
    let authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
    window.open(twitterUrl, "_blank");

}

//on Load
getQuote();