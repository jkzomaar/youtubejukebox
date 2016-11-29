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

    exec("bash -c 'exec nohup setsid bash /var/www/html/zomaar/server/scripts/download.sh $videoId $durationString  > /dev/null 2>&1 &'", $output, $returnValue);
    if($returnValue != '0'){
        http_response_code(500);
        return $output;
    }
    return $output;
}
