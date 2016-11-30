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
        html += '<div class="grid">';
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
                html += '<img class="ytThumbnail"  src="' + json.items[tempVideo].snippet.thumbnails.high.url + '" alt="thumbnail">';
                html += '<div class="caption"><h3 class="vtitle">' + json.items[tempVideo].snippet.title + ' (' + duration + ')</h3>';
                html += '<p class="description">' + json.items[tempVideo].snippet.description + '</p></div>';
                html += '<div class="queueBtn"><a href="#" class="btn btn-warning btn-lg center-block qbutton" onclick="requestVideo(\'' +json.items[tempVideo].id.videoId+'\', \'' + jsonDetail.items[0].contentDetails.duration + '\');">Put in Queue</a></div></div></div>';
                if (currentVideo == (numberOfVideos - 1)) {
                    html+="</div>";
                    $('#search-result').html(html);
                    var $grid = $('.grid').masonry({
                        // options...
                        initLayout: false,
                        itemSelector: '.grid-item',
                        columnWidth: 300,
                        fitWidth: true,
                        gutter: 10
                    });
                    $grid.masonry( 'on', 'layoutComplete', function() {
                        console.log('layout is complete');
                    });
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                    });
                    // trigger initial layout
                    $grid.masonry();

                }
            });
        }

    });

}

function requestVideo(id, duration){
        $('#modalTitle').html("<span class='glyphicon glyphicon-time' aria-hidden='true'></span> Please wait</h4>");
        $('#modalBody').html('<p>Requesting this video...</p>');
    $('#myModal').modal('show');
    var videoInfo = {
	'addToQueue' : true,
        'videoId'	: id,
        'durationString': duration
    };
    $.ajax({
        url     : '../server/scripts/api/queue.php',
        data    : videoInfo,
        dataType: 'json',
        method  : 'post'
    }).done(function(data){
        $('#modalTitle').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Succes!</h4>');
        $('#modalBody').html('<p>The video was succesfully queued.</p>');
    }).fail(function(data){
        console.log(data);
        $('#modalTitle').html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Oops!</h4>');
        $('#modalBody').html('<p>Something went wrong!</p>');
    });

}
