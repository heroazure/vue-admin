#!/bin/bash

LOG_FILE="log_deploy.log"

date >> "$LOG_FILE"
echo "Start deployment" >>"$LOG_FILE"
echo "pulling source code..." >> "$LOG_FILE"
git reset --hard origin/develop
git clean -f
git pull
git checkout develop
echo "Finished." >>"$LOG_FILE"
echo >> $LOG_FILE
