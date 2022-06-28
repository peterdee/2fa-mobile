## 2FA Mobile

<img
  src="./assets/images/icon.png"
  style="height: 128px; margin-left: calc(50% - 64px); width: 128px;"
/>

2FA Mobile is used to generate [OTPs](https://datatracker.ietf.org/doc/html/rfc6238#page-9) for 2FA-enabled resources

QR codes for the testing can be generated with [2FA Generator](https://github.com/peterdee/2fa-generator)

### Required resources

Application requires an access to the camera in order to be able to scan the QR code

### Deploy

```shell script
git clone https://github.com/peterdee/2fa-mobile
cd ./2fa-mobile
nvm use 16
npm i
```

### Environment variables & required files

The `.env` file is **required**, see [.env.example](.env.example) for details

The `backend-url.ts` file in the `constants` directory is also **required**, it can be automatically generated if the project is launched with `npm start`, or it can be manually created, see [backend-url.example.ts](constants/backend-url.example.ts) for details

### Launch

Launch development server:

```shell script
npm start
```

Launch on Android emulator:

```shell script
npm run android
```

Launch on iOS emulator:

```shell script
npm run ios
```

### License

[MIT](./LICENSE.md)
