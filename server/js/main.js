$( document ).ready(function() {

loadVideo();
});

function loadVideo(){
 $('#videoContainer').html('');
    $.get("../../server/queue.csv", function(data, status){
       // alert("Data: " + data + "\nStatus: " + status);
        var linescsv = data.split("\n");
        generateVideo(linescsv);
    });
    
    function generateVideo(apps){
        var video = apps[0].split(",");
        var html='';
        html+='<video id="videoPlayer" width="100%" autoplay controls>'
        html+='<source id="videoPlayerSource" src="video/' + video[0] + '.webm" type="video/webm">'
        html+='Your browser does not support the video tag.'
        html+='</video>'
        $('#videoContainer').html(html);
    }
}
