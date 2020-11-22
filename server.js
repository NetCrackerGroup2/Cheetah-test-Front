const express = require('express');

const app = express();

app.use(express.static('./dist/cheetah-test-front'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/cheetah-test-front/'}),
);

app.listen(process.env.PORT || 8081);
