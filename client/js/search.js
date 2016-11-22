$( document ).ready(function() {
    $('#search-button').click(function(){
      search();
    });

});


// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  window.scrollTo(0,0);
  document.getElementById("search-button").disabled = true;
  var q = $('#query').val() + " song";
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20,
    order: 'relevance',
    type: 'video'
  });

  request.execute(function(response) {
    document.activeElement.blur();
    var json = response.result;
    var html = '';
    // it is more performant to calculate the length once
    var arrayLength = json.items.length;

    html += '<div class="grid" onload="window.dispatchEvent(new Event(\'resize\'));">';
    for(var i = 0; i < arrayLength; i++){
      html += '<div class="grid-item"><div class="searchresult thumbnail">';
      html += '<img src="' + json.items[i].snippet.thumbnails.high.url  + '" alt="thumbnail" onload="window.dispatchEvent(new Event(\'resize\'));">';
      html += '<div class="caption"><h3 class="vtitle">' + json.items[i].snippet.title + '</h3>';
      html += '<p class="description">' + json.items[i].snippet.description + '</p></div>';
      html += '<div class="queueBtn"><a href="#" class="btn btn-warning btn-lg center-block qbutton" role="button">Put in Queue</a></div></div></div>';
    }
    html += '</div>';
    $('#search-result').html(html);
  $('.grid').masonry({
    // options...
    itemSelector: '.grid-item',
    columnWidth: 300,
    fitWidth: true,
    gutter: 10
  });
  new Promise( function() {setTimeout(function(){ window.dispatchEvent(new Event('resize'));}, 1000);} );  
  });
}
