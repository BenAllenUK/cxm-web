export ROOT_PATH=$(pwd)

# Install clients
yarn --cwd "$ROOT_PATH/clients/web" install
yarn --cwd "$ROOT_PATH/clients/app" install

# Install services
yarn --cwd "$ROOT_PATH/services/api" install
yarn --cwd "$ROOT_PATH/services/auth0" install

echo "Install complete"