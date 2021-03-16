export ROOT_PATH=$(pwd)


mkcert -cert-file "$ROOT_PATH/clients/proxy/omnea.local.pem" -key-file "$ROOT_PATH/clients/proxy/omnea.local-key.pem" omnea.local admin.omnea.local api.omnea.local docs.omnea.local hosted.omnea.local localhost