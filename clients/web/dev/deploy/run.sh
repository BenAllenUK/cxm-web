if test -z "$1"
then
  echo "No module selected"
  exit 1
fi

CONFIG_PATH="$DEPLOYMENT_CONFIG_BUCKET/clients/web"

# CLEAN
rm -r pages 2>/dev/null
rm -r .serverless 2>/dev/null

# SYNC
aws s3 sync "$CONFIG_PATH/$1/.serverless" ".serverless"


# COPY
cp deployments/$1.yml serverless.yml 2>/dev/null
cp -r src/pages/$1/ pages/ 2>/dev/null
cp -r src/pages/_app.js pages/_app.js 2>/dev/null


# DEPLOY
./node_modules/.bin/sls

# SYNC
aws s3 sync ".serverless" "$CONFIG_PATH/$1/.serverless" 

# CLEAN
rm -r pages 2>/dev/null
rm -r .serverless 2>/dev/null
