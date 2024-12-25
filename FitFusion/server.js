const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')


const PORT = 8080

const server = http.createServer((req, res) => {
    if (req.method == 'GET') {

        const staticFilePath = path.join(__dirname, 'public', req.url);
        if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
            const extname = path.extname(req.url);
            let contentType = 'application/octet-stream';

            // Set appropriate content types
            switch (extname) {
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.gif':
                    contentType = 'image/gif';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(staticFilePath).pipe(res);
            return;
        }

        switch (req.url) {
            case '/': {
                fs.readFile(path.join(__dirname, 'login.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the login page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/dashboard': {
                fs.readFile(path.join(__dirname, 'dashboard.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/register': {
                fs.readFile(path.join(__dirname, 'register.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the registration page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/temp': {
                fs.readFile(path.join(__dirname, 'temp.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the temp page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/bmr': {
                fs.readFile(path.join(__dirname, 'bmr.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the bmr page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/calorie': {
                fs.readFile(path.join(__dirname, 'calorie.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the calorie page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/wk': {
                fs.readFile(path.join(__dirname, 'wk.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the wk page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/wk2': {
                fs.readFile(path.join(__dirname, 'wk2.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the wk2 page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/wk3': {
                fs.readFile(path.join(__dirname, 'wk3.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the wk3 page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/workoutvid': {
                fs.readFile(path.join(__dirname, 'workoutvid.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the workoutvid page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/workoutvid2': {
                fs.readFile(path.join(__dirname, 'workoutvid2.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the workoutvid2 page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            case '/workoutvid3': {
                fs.readFile(path.join(__dirname, 'workoutvid3.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the workoutvid3 page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            }
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
            }
        }
    }
    else if (req.method === 'POST') {
        switch (req.url) {
            case '/login': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)

                    // Read the users from the users.json file
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' })
                            res.end('Error reading user data')
                            return
                        }

                        // Parse the users data
                        const users = JSON.parse(data)

                        // Authenticate the user by checking the username and password
                        const user = users.find(u => u.username === username && u.password === password)

                        if (user) {
                            // If user is found, redirect to the dashboard
                            res.writeHead(302, { 'Location': '/dashboard' })
                            res.end()
                        } else {
                            // If user is not found, redirect to the register page
                            res.writeHead(302, { 'Location': '/temp' })
                            res.end()
                        }
                    })
                })
                break
            }
            case '/register': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)
                    const userData = { username, password }

                    // Read existing users from users.json or create an empty array if file doesn't exist
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        let users = []

                        if (!err) {
                            users = JSON.parse(data)
                        }

                        // Save new user to the users array
                        users.push(userData)

                        // Write the updated users array to users.json
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' })
                                res.end('Error saving registration data')
                                return
                            }
                            res.writeHead(302, { 'Location': '/' })
                            res.end()
                        })
                    })
                })
                break
            }
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
            }
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
