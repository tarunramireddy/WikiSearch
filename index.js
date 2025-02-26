let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function createAndAppendSearchResults(result){

    let {title,link,description} = result;
    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEle);
    
    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.href = link;
    resultTitleEle.textContent = title;
    resultTitleEle.target = "_blank";
    resultItemEle.appendChild(resultTitleEle);

    let titleBreakEle = document.createElement("br");
    resultItemEle.appendChild(titleBreakEle);

    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.textContent = link;
    resultItemEle.appendChild(urlEle);

    let urlBreakEle = document.createElement("br");
    resultItemEle.appendChild(urlBreakEle);

    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add(link-description);
    descriptionEle.textContent = description;
    resultItemEle.appendChild(descriptionEle);


}

function displayResults(search_results){
    spinnerEle.classList.toggle("d-none");
    for (let result of search_results){
        createAndAppendSearchResults(result);
    }
}

function wikiSearch(event){
    if(event.key === "Enter"){
        spinnerEle.classList.toggle("d-none");
        searchResultsEle.textContent = "";
        let searchInput = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search="+searchInput;
        let options = {
            method: "GET"
        }

        fetch(url,options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData){
            let { search_results } = jsonData;
            displayResults(search_results);
        })
    }
}
searchInputEle.addEventListener("keydown", wikiSearch);