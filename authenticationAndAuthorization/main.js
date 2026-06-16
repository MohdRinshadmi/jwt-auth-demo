const express = require('express');
const session = require('express-session');

const app = express();

// middleware to set up session management
app.use(session({
    secret: 'secret-key', // replace with a strong secret key.
    resave: false, // whether to save the session data if there were no modifications.
    saveUninitialized: true, // whether to save new but not modified sessions
    cookie: {secure: false} // set to true in production with https
}))

// POST endpoint for handling login
app.post('/login', (req, res) =>{
    const {username, password} = req.body;

    // simulated user authentication (replace with actual logic)
    if(username === 'user' && password == 'password'){
        req.session.user = username; // store user information in session
        res.send('Logged in successfully')
    } else {
        res.send('Invalid credentials')
    }
})

// GET endpoint for accessing dashboard
app.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.send(`Welcome ${req.session.user}`)
    } else {
        res.send('Please log in first')
    }
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'))