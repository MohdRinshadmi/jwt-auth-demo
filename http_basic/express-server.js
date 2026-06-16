const express  = require('express');
const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Home Page!');
})

// About route
app.get('/about', (req, res) => {
    res.send('This is the About Page.');
});

// 404 route (catch-all)
app.use((req, res) => {
    res.status(404).send('Page Not Found');
})

// start server
app.listen(PORT, () => {
    console.log(`Express server running at http://192.168.12.28:${PORT}`)
});