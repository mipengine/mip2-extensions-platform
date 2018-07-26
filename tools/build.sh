#!/bin/bash

echo "start to install dependencies for each site"

rm -rf dist

# install dependencies for each site
for sitePath in sites/*
do
    if [ -d $sitePath ]
    then
        site=`basename $sitePath`
        cd sites/$site
        npm install --production
        cd ../..
    fi
done

echo "start to build"
# build each site in parallel
node tools/build-site.js