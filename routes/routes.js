// import other routes
const priceRoutes = require('./prices');
const userRoutes = require('./users');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    userRoutes(app, fs);
    priceRoutes(app,fs);

};

module.exports = appRouter;