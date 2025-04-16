const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // where your .ejs files are

// Static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.render('login'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/register', (req, res) => res.render('register'));
app.get('/temp', (req, res) => res.render('temp'));
app.get('/bmr', (req, res) => res.render('bmr'));
app.get('/calorie', (req, res) => res.render('calorie'));
app.get('/wk', (req, res) => res.render('wk'));
app.get('/wk2', (req, res) => res.render('wk2'));
app.get('/wk3', (req, res) => res.render('wk3'));
app.get('/workoutvid', (req, res) => res.render('workoutvid'));
app.get('/workoutvid2', (req, res) => res.render('workoutvid2'));
app.get('/workoutvid3', (req, res) => res.render('workoutvid3'));

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userPath = path.join(__dirname, 'users.json');
    fs.readFile(userPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error reading user data');

        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/temp');
        }
    });
});

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
    const userPath = path.join(__dirname, 'users.json');

    fs.readFile(userPath, 'utf-8', (err, data) => {
        let users = [];
        if (!err && data) users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile(userPath, JSON.stringify(users, null, 2), err => {
            if (err) return res.status(500).send('Error saving user');
            res.redirect('/');
        });
    });
});

// 404 fallback
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
