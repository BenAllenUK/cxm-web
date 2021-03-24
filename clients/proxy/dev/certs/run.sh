export ROOT_PATH=$(pwd)

if [ -z "$CI" ]
then
echo "Creating cert...."
mkcert -cert-file "$ROOT_PATH/omnea.local.pem" -key-file "$ROOT_PATH/omnea.local-key.pem" omnea.local admin.omnea.local api.omnea.local docs.omnea.local hosted.omnea.local localhost
else
echo "Skipping cert...."
fi