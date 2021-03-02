if test -z "$1"
then
  echo "No module selected"
  exit 1
fi


cp deployments/$1.yml serverless.yml 2>/dev/null
mv pages _pages || :
mkdir pages
cp -R _pages/$1/ pages/
mv .serverless.$1 .serverless 2>/dev/null