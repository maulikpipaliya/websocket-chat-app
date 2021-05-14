const express = require('express');
const app = express();

const server = app.listen(3030, () => {
    console.log("Listening on 3030");
});

app.use(express.static('public'));