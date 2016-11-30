<?php

if(isset($_POST['addToQueue'])){
    echo json_encode(addToQueue($_POST['videoId'], $_POST['durationString']));
}

function addToQueue($videoId = false, $durationString = false){
    if(!$videoId || !$durationString){
        http_response_code(500);
        return 'All input fields are required';
    }

    // if video id valid
    if(preg_match('/[^a-z_\-0-9]/i', $videoId)){
        http_response_code(500);
        return 'Invalid videoID';
    }

    // temp if $durationString is valid
    if(preg_match('/[^a-z:0-9]/i', $durationString)){
        http_response_code(500);
        return 'Invalid videoID';
    }

    exec("bash /srv/http/zomaarmusic.cinaed.be/public_html/server/scripts/download.sh $videoId $durationString", $output, $returnValue);
    if($returnValue != '0'){
        http_response_code(500);
        return $output;
    }
    return $output;
}
