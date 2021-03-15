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


