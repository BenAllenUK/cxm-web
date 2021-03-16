#!/bin/bash

CONFIG_PATH="$DEPLOYMENT_CONFIG_BUCKET/services/api"

aws s3 sync "$CONFIG_PATH/.serverless" ".serverless"

./node_modules/.bin/sls deploy

aws s3 sync ".serverless" "$CONFIG_PATH/.serverless"