## Setup

1) Run `yarn install`
2) Modify `sudo nano /etc/hosts` and add this line:

```
127.0.0.1       omnea.local admin.omnea.local api.omnea.local docs.omnea.local uploads.omnea.local
```

3) Run `yarn dev`

4) Open [http://omnea.local:3000](http://omnea.local:3000) with your browser to see the result.

## Env vars

Environment variables need to be added to multiple files:
- `.envrc` (ignored via git)
- `next.config.js` 
- `serverless.yml`
- All workflows under `.github/workflows`
- AWS System manager (https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1&tab=Table)


