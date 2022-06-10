## 2FA Mobile

<img
  src="./assets/images/icon.png"
  style="height: 128px; margin-left: calc(50% - 64px); width: 128px;"
/>

2FA Mobile is used to generate [OTPs](https://datatracker.ietf.org/doc/html/rfc6238#page-9) based on the scanned tokens

### Required resources

Application requires an access to the camera in order to be able to scan the QR code

### Deploy

```shell script
git clone https://github.com/peterdee/2fa-mobile
cd ./2fa-mobile
nvm use 16
npm i
```

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
