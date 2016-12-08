<?php

if(isset($_POST['addToQueue'])){
    echo json_encode(addToQueue($_POST['videoId'], $_POST['durationString']));
}

if(isset($_POST['nextSong'])){
    echo json_encode(playNextSong($_POST['currentSongID']));
}

function addToQueue($videoId = false, $durationString = false){
    if(!$videoId || !$durationString){
        http_response_code(500);
        return 'All input fields are required';
    }

    // Allow only a-Z, 0-9, '_' and '-'
    // Explanation: /i does toLower on the string
    if(preg_match('/[^a-z_\-0-9]/i', $videoId)){
        http_response_code(500);
        return 'Invalid videoID';
    }

    // Allow only a-Z, 0-9 and ':'
    // Explanation: /i does toLower on the string
    if(preg_match('/[^a-z:0-9]/i', $durationString)){
        http_response_code(500);
        return 'Invalid videoID';
    }

    exec("bash /srv/http/zomaarmusic.cinaed.be/public_html/server/scripts/download.sh $videoId $durationString", $output, $returnValue);
    if(intval($returnValue) !== 0){
        http_response_code(500);
        return $output;
    }
    return $output;
}

function playNextSong($currentSongID = false){
    if(!$currentSongID){
        http_response_code(500);
        return 'No song ID given';
    }

    // Allow only a-Z, 0-9, '_' and '-'
    // Explanation: /i does toLower on the string
    if(preg_match('/[^a-z_\-0-9]/i', $currentSongID)){
        http_response_code(500);
        return 'Invalid videoID';
    }

    exec("bash /srv/http/zomaarmusic.cinaed.be/public_html/server/scripts/nextsong.sh $currentSongID", $output, $returnValue);
    if(intval($returnValue) !== 0){
        http_response_code(500);
        return $output;
    }
    return $output;
}
