const app = require('express')();
const routes = require('./src/routes/index');

const port = 3000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});