const path = require('path');
const express = require('express');
const app = express();

const configArg = process.argv.slice(2).find(
    arg => /^--config=\w+\.json$/.test(arg)
);

if (!configArg) {
    throw 'A config file must be provided';
}
const [, configFile] = configArg.split('=');
const config = require(path.join(__dirname, configFile));

if (config.node.version.major !== process.version) {
    throw 'Application started with wrong node version';
}

app.listen(3000, () => console.log('Server started on port 3000'))

app.use((req, res, next) => {
    res.header['x-node-version'] = process.version;
});

app.get('/version', (req, res) => {
    res.json({
        version: process.version
    });
});
