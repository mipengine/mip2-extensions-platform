#!/bin/bash

echo "start to validate components of each site"

{
    mip2 validate -c sites 
} || {
    echo "===== Validate Failed! Please check components specification ====="
}
