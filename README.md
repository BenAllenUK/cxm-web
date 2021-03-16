## Setup

1) Run `brew install mkcert`
2) Run `mkcert -install`
3) Run `yarn install`
4) Run `yarn setup`
5) Modify `sudo nano /etc/hosts` and add this line:

```
127.0.0.1       omnea.local admin.omnea.local docs.omnea.local api.omnea.local
```

3) Run `yarn dev`

4) Open [http://omnea.local:3000](http://omnea.local:3000) with your browser to see the result.


### Example hosts file

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhost omnea.local admin.omnea.local docs.omnea.local api.omnea.local
255.255.255.255 broadcasthost
::1             localhost
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
# End of section
```
## Env vars

Environment variables need to be added to multiple files:
- `.envrc` (ignored via git)
- `next.config.js` 
- `serverless.yml`
- All workflows under `.github/workflows`
- AWS System manager (https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1&tab=Table)


## Env vars


## System Manager

[AWS System manager](https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1&tab=Table) is used to manage remote environment variables. NOT secrets manager. 

You can add a secret like so:
```
aws ssm put-parameter --name=/prod/NAME --value=VALUE --type=String --overwrite
```

The naming convention for secrets is `/[ENVIRONMENT]/[NAME]`.

For example:
```
/production/AUTH0_SECRET
```

View more about [interacting here](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/create-secret.html)

### Services - API

If adding env var to the API (`services/api`):
1. Add to `.envrc`
2. Add to beta and production values to 
3. Add additional config to `services/api/serverless.yml` under `environment` property. i.e: `NEW_ENV: ${ssm:/prod/NEW_ENV}`


# Deployment (Local)

Deployment is handled by build servers. You should use the build servers to deploy this project.

- `brew install go`
- `go get -u github.com/remind101/ssm-env`
- Add .envrc
- Run `ssm-env env > .env `
- `yarn deploy:root`