# Node API Starter

## setup a basic express server

-   install dependencies and `.gitignore`
```sh
npx gitignore node
```

```sh
npm install --save  express http-errors morgan jade helmet debug cookie-parser
```

-   Add "start" scripts to the `package.json` file
```json
 "scripts": {
    "start": "node server.js"
  },
```

- Add `index.js`
```js
const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
