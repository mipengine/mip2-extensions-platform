#!/bin/bash

echo "start to validate components of each site"

# install dependencies for each site
for sitePath in sites/*
do
    if [ -d $sitePath ]
    then
        site=`basename $sitePath`
        cd sites/$site
        mip2 validate -c components
        cd ../..
    fi
done