if test -z "$1"
then
  echo "No module selected"
  exit 1
fi

cp deployments/$1.yml serverless.yml
rm -R -f pages
mkdir pages
cp -R src/paths/$1/* pages/