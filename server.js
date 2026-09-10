const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "v1.0";

app.get('/', (req, res) => {
    res.send('<h1>Application Status: HEALTHY - VERSION 2 - VERSION 1</h1>');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP", version: VERSION });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});

