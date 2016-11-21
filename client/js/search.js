// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  window.scrollTo(0,0);
  var q = $('#query').val() + " song";
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20,
    order: 'relevance',
    type: 'video'
  });

  request.execute(function(response) {
    //var str = JSON.stringify(response.result);
    //$('#search-container').html('<pre>' + str + '</pre>');
    var json = response.result;
    $('#search-container').html('</br></br></br>');
    $('#search-container').append('<div class="row">');
    for(var i = 0; i < json.items.length; i++) {
    var obj = json.items[i];
    console.log(obj.snippet.title);
    $('#search-container').append('<div class="col-sm-5 col-md-4 col-lg-3"><div class="searchresult thumbnail"><img src="' + obj.snippet.thumbnails.high.url + '" alt="thumbnail"><div class="caption"><h3 class="vtitle">' + obj.snippet.title + '</h3><p class="description">' + obj.snippet.description + '</p><p><a href="#" class="btn btn-warning btn-lg center-block qbutton" role="button">Put in Queue</a></div></div></div>');
} 
    $('#search-container').append('</div>');
  });
}

