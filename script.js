const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const xBtn = document.querySelector(".X-button");
const newQuoteBtn = document.querySelector(".new-quote");
const loader = document.querySelector(".loader");


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    try{
        // first fetch() will execute then response will be initialized
        const response = await fetch("https://api.quotable.io/random");
        // wait till response is converted in json format
        const data = await response.json();
        // If author is blank, add unknown
        if(data.author === ""){
            authorText.innerText = "Unknown"
        }else {
            authorText.innerText = data.author;
        }

        // Dynamically reduce font size when quote length exceeds 120 characters
        if (data.content.length > 120) {
            quoteText.classList.add("long-quote");
        }else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.content;
        // Stop Loader
        removeLoadingSpinner();
    } catch(error){
        // console.log(error);
    }
}

// Post on X
function xQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const xUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(xUrl, "_blank");
}


// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);

xBtn.addEventListener("click", xQuote);

// On Load
getQuote();
