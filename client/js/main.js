//make enter in the search box click the search button
document.getElementById("query")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("search-button").click();
    }
});
