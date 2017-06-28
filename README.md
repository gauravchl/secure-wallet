# secure wallet

A PWA for password manager, works offline, uses local storage to store all data, built with react + redux + webpack.

App: https://gauravchl.github.io/secure-wallet/

![artboard 2](https://user-images.githubusercontent.com/3471415/27639136-faf693a8-5c32-11e7-8189-6dccf98007ee.png)

**Specs**

- Pure client side app, no server dependencies, store everything inside browser's local storage.
- Encrypts all data using AES256 before saving it to storage.
- Uses master key to perform AES operation. Master key is also protected with [bcrypt](https://en.wikipedia.org/wiki/Bcrypt)

**Tech Stack**
- [Reactjs](https://facebook.github.io/react/), [redux](http://redux.js.org/) for front end
- [Webpack](https://webpack.js.org/) for module bundler
- [Radium](http://formidable.com/open-source/radium/) for inline css
- [material-ui](http://www.material-ui.com/) For material design components
- [crypto-js](https://github.com/brix/crypto-js), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for data security


**TODO**
- Toggle button to show password
- New version alert, reload btn
- Show confirmation box before removing item
- Backup & restore
- Dropbox + Google Drive sync
- Direct/Quick Copy(master key + separator + title) without login.
- Add help guide
- Add auto logout(after 5 min)
