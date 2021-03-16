if test -z "$1"
then
  echo "No module selected"
  exit 1
fi


_scripts/copy/run.sh $1
yarn run next build
_scripts/clean/run.sh $1
