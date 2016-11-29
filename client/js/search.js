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
    $('#search-result').html('');
    var json = "";
    var numberOfVideos = 20;
    var currentVideo = 0;
    window.scrollTo(0, 0);
    document.getElementById("search-button").disabled = true;
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        maxResults: 20,
        order: 'relevance',
        type: 'video',
	videoCategoryId: '10',
	videoDuration: 'medium'
    });

    request.execute(function(response) {
        document.activeElement.blur();
        json = response.result;
        var arrayLength = json.items.length;
        var html = "";
        html += '<div class="grid" onload="window.dispatchEvent(new Event(\'resize\'));">';
        for (var i = 0; i < arrayLength; i++) {
            var index = i;
            //recursive query to get the video duration
            var requestDetail = gapi.client.youtube.videos.list({
                part: 'contentDetails',
                id: json.items[i].id.videoId
            });

            requestDetail.execute(function(response) {
                currentVideo += 1;
                var tempVideo=(currentVideo-1);
		var jsonDetail = response.result;
                var duration=convertDuration(jsonDetail.items[0].contentDetails.duration);
                html += '<div class="grid-item"><div class="searchresult thumbnail">';
                html += '<img src="' + json.items[tempVideo].snippet.thumbnails.high.url + '" alt="thumbnail" onload="window.dispatchEvent(new Event(\'resize\'));">';
                html += '<div class="caption"><h3 class="vtitle">' + json.items[tempVideo].snippet.title + ' (' + duration + ')</h3>';
                html += '<p class="description">' + json.items[tempVideo].snippet.description + '</p></div>';
                html += '<div class="queueBtn"><a href="#" class="btn btn-warning btn-lg center-block qbutton" onclick="requestVideo(\'' +json.items[tempVideo].id.videoId+'\', \'' + jsonDetail.items[0].contentDetails.duration + '\');">Put in Queue</a></div></div></div>';
                if (currentVideo == (numberOfVideos - 1)) {
                    html+="</div>";
		    html+="<div id='myModal' class='modal fade' role='dialog' style='margin-top: 75px;'>";
		    html+="<div class='modal-dialog'>";
	            html+="<div class='modal-content'>";
	            html+="<div class='modal-header'>";
		    html+="<button type='button' class='close' data-dismiss='modal'>&times;</button>";
		    html+="<h4 class='modal-title' id='modalTitle'><span class='glyphicon glyphicon-time' aria-hidden='true'></span> Please wait</h4>";
		    html+="</div>";
		    html+="<div class='modal-body' id='modalBody'>";
                    html+="<p>Requesting this video...</p>";
		    html+="</div>";
		    html+="<div class='modal-footer'>";
		    html+="<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
		    html+="</div>";
	            html+="</div>";
		    html+="</div>";
		    html+="</div>";
                    $('#search-result').append(html);
                    $('.grid').masonry({
                        // options...
                        itemSelector: '.grid-item',
                        columnWidth: 300,
                        fitWidth: true,
                        gutter: 10
                    });
                    new Promise(function() {
                        setTimeout(function() {
                            window.dispatchEvent(new Event('resize'));
                        }, 1500);
                    });
                }
            });
        }

    });

}

function requestVideo(id, duration){
    $('#myModal').modal('show');
    var videoInfo = {
	'addToQueue' : true,
        'videoId'	: id,
        'durationString': duration
    };
    $.ajax({
            url     : '../../server/scripts/api/queue.php',
            data    : videoInfo,
            dataType: 'json',
            method  : 'post'
        }).done(function(data){
            console.log(data);
        }).fail(function(data){
            console.log(data);
       });

}
