#!/bin/bash

script_path=$(cd `dirname $0` && pwd)
sitesDir=sites

# clean
rm -rf $script_path/dist
rm -rf $script_path/node_modules
echo 'clean done.'

# install dependencies of each site
for sitePath in $script_path/$sitesDir/*
do
    if [ -d $sitePath ]
    then
        for site in `basename $sitePath`
        do
            cd $sitesDir/$site
            npm install --production
            cd ../..
        done
    fi
done

# run build
npm install && node $script_path/build.js
