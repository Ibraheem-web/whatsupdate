import FlexSearch from "flexsearch";

var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
        id: 'id',
        store: [
            "href", "title", "description"
        ],
        index: ["title", "description"]
    }
});
// Load index data asynchronously
// dataUrl is the url that contains search.json
fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        // Loop through the data and add it to the index
        data.forEach(item => {
            index.add({
                id: item.id,
                href: item.href,
                title: item.title,
                description: item.description
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


var inputElement = document.getElementById('searchInput');
var resultsElement = document.getElementById('searchResults');

inputElement.addEventListener('input', function () {
    var query = inputElement.value;
    var results = index.search(query);

    // Display search results
    resultsElement.innerHTML = '';
    results.forEach(function (result) {
        var li = document.createElement('li');
        li.textContent = result.title;
        resultsElement.appendChild(li);
    });
});