const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(`${__dirname}/build/index.html`));
});

app.listen(PORT, () => {
  console.log('Server running on port %d', PORT);
});
