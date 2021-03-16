export ROOT_PATH=$(pwd)

# Install clients
rm -rf "$ROOT_PATH/clients/web/node_modules"
rm -rf "$ROOT_PATH/clients/app/node_modules"
rm -rf "$ROOT_PATH/clients/proxy/node_modules"

# Install services
rm -rf "$ROOT_PATH/services/api/node_modules"
rm -rf "$ROOT_PATH/services/auth0/node_modules"

echo "Uninstall complete"