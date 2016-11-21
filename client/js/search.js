// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
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
    for(var i = 0; i < json.items.length; i++) {
    var obj = json.items[i];
    console.log(obj.snippet.title);
    $('#search-container').append('<div class="row"><div class="col-sm-0 col-md-4"><div class="thumbnail"><img src="' + obj.snippet.thumbnails.high.url + '" alt="thumbnail"><div class="caption"><h3>' + obj.snippet.title + '</h3><p>' + obj.snippet.description + '</p><p><a href="#" class="btn btn-primary" role="button">Button</a></div></div></div></div>');
} 
  });
}

