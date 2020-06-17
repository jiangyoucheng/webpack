const express = require('express');

const app = express();

app.get('/api/info', (req,res) => {
    res.json({
        msg: "hello world"
    })
})

app.listen('9001', () => console.log('server running'));