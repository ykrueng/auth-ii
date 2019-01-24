const server = require("./api/server");
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server listening on port ${port}`));

server.use(express.static(path.join(__dirname, '/client/build')));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// const port = 8000;
// server.listen(port, () => {
//   console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
// });
