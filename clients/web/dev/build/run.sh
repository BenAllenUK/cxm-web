if test -z "$1"
then
  echo "No module selected"
  exit 1
fi

CONFIG_PATH="$DEPLOYMENT_CONFIG_BUCKET/clients/web"

# CLEAN
rm -r pages 2>/dev/null

# COPY
cp -r src/pages/$1/ pages/ 2>/dev/null
cp -r src/pages/_app.js pages/_app.js 2>/dev/null


# DEPLOY
./node_modules/.bin/next build