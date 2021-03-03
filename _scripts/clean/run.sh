if test -z "$1"
then
  echo "No module selected"
  exit 1
fi


rm serverless.yml
rm -rf pages
rm -rf .serverless.$1
mv .serverless .serverless.$1 