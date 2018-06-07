#!/bin/bash

script_path=$(cd `dirname $0` && pwd)

# clean
rm -rf $script_path/dist
rm -rf $script_path/node_modules
echo 'clean done.'

# install dependencies of each site
for siteName in $script_path/*
do
    if [ -d $siteName ]
    then
        for site in `basename $siteName`
        do
            cd $site
            npm install --production
            cd ..
        done
    fi
done

# run build
npm install && node $script_path/build.js
