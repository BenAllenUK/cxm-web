if test -z "$1"
then
  echo "No module selected"
  exit 1
fi


_scripts/copy/run.sh $1
yarn run serverless
_scripts/clean/run.sh $1
