#!/bin/bash

#get local directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VIDEO_DIR="$DIR/../video/"
QUEUE_FILE="$DIR/../queue.csv"
LOG_DIR="$DIR/../log"
BLACKLIST_FILE=$DIR/../blacklist

#get params
VIDEO_ID=$1
if [ -z "$VIDEO_ID" ]; then
	echo "EMPTY VIDEO ID"
	exit 1
fi
VIDEO_TITLE=$(youtube-dl --id https://www.youtube.com/watch?v=$VIDEO_ID -e --restrict-filenames --no-warnings)
VIDEO_DURATION=$2
if [ -z "$VIDEO_DURATION" ]; then
	echo "EMPTY VIDEO DURATION"
	exit 1
fi

if grep -q "$VIDEO_ID" "$BLACKLIST_FILE";then
	echo "BLACKLISTED"
	exit 1
fi


#get queue date
FULLDATE=`date +%Y-%m-%d\ %H:%M:%S`
DATE=`date +%Y-%m-%d`

#create directory structure if not existing.
touch $QUEUE_FILE
mkdir -p $LOG_DIR
LOG_FILE=$LOG_DIR/$DATE.log
touch $LOG_FILE
mkdir -p $VIDEO_DIR
touch $BLACKLIST_FILE

#go to videofolder
cd $VIDEO_DIR

#download file (youtube-dl skips duplicate downloads)
youtube-dl -f 43 --id https://www.youtube.com/watch?v=$VIDEO_ID --quiet --restrict-filenames --no-warnings

#create csv line
VIDEOSTRING="$VIDEO_ID,\"$VIDEO_TITLE\",$VIDEO_DURATION,$FULLDATE"

if grep -q "$VIDEO_ID" "$QUEUE_FILE"; then
	echo "ALREADY_SCHEDULED"
  	exit 1
else
	echo "Adding $VIDEOSTRING to play queue." >> $LOG_FILE
	echo $VIDEOSTRING >> $QUEUE_FILE
fi

echo "SUCCESS"
exit
