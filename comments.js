// Create web server and listen on port 3000
// Use the comments.js file to store comments

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.json([]);
                return;
            }
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                throw err;
            }
            res.json(comments);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
