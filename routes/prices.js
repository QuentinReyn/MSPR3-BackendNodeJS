
const priceRoutes = (app, fs) => {

    // variables
    const dataPath = './data/prices.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/prices', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/prices', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newPriceId = Date.now().toString();

            // add the new price
            data[newPriceId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new price added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/prices/:id', (req, res) => {

        readFile(data => {

            // add the new price
            const priceId = req.params["id"];
            data[priceId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`prices id:${priceId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/prices/:id', (req, res) => {

        readFile(data => {

            // add the new price
            const priceId = req.params["id"];
            delete data[priceId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`prices id:${priceId} removed`);
            });
        },
            true);
    });
};

module.exports = priceRoutes;
