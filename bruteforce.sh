#!/bin/bash

http_code=$(curl -L --data-urlencode --data-urlencode "https://msrpreseau.herokuapp.com/" -w '%{http_code}' -o /dev/null -s)
COUNTER=1
while [ $http_code -ne 429 ]
do
  echo $http_code
  http_code=$(curl -L --data-urlencode --data-urlencode "https://msrpreseau.herokuapp.com/" -w '%{http_code}' -o /dev/null -s)
  COUNTER=$[$COUNTER +1]
done
echo "[Server block]: success after $COUNTER attent(s) (return code $http_code)"

