#!/bin/bash

#get local directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
QUEUE_FILE="$DIR/../queue.csv"
VIDEO_ID=$1

cd $DIR

#check if we have a queue, exit if not.
if [ ! -f $QUEUE_FILE ]; then
    echo "No queue found!"
    exit 1
fi

#check if we have a parameter
if [ -z "$VIDEO_ID" ]; then
    echo "No video ID!"
    exit 1
fi

QUEUE_TOP=$(cat $QUEUE_FILE | head -n 1 | cut -d "," -f 1)

if [[ $QUEUE_TOP == $VIDEO_ID ]]; then
    if cat $QUEUE_FILE | wc -l -eq 1 || cat $QUEUE_FILE | wc -l -eq 0


   
	
    echo "Skipping to next track."
    tail -n +2 $QUEUE_FILE > tempq
    mv tempq  $QUEUE_FILE
else
    echo "No such ID as top track"
    exit 1
fi
