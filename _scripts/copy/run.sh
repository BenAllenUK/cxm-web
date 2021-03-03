if test -z "$1"
then
  echo "No module selected"
  exit 1
fi


cp deployments/$1.yml serverless.yml 2>/dev/null
rm -r pages 2>/dev/null
cp -r src/pages/$1/ pages/ 2>/dev/null
cp -r src/pages/_app.js pages/_app.js 2>/dev/null
rm -r .serverless 2>/dev/null
cp -r .serverless.$1 .serverless 2>/dev/null