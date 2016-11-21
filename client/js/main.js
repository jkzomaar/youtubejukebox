//make enter in the search box click the search button
document.getElementById("query")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("search-button").click();
    }
});

//enable search button when typing new query (to avoid spamming)
document.getElementById("query")
    .addEventListener("keypress", function() {
        document.getElementById("search-button").disabled = false; 
});

function showQ(){
 $('#search-container').html('</br></br></br><pre class="block-center">todo: implement queue viewer</pre>'); 
}
