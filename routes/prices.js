
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
            // add the new price
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
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
            for (let [i, price] of data.entries()) {
                if (price.id == priceId) {
                    price.product_name = req.body.product_name;
                    price.tva = req.body.tva;
                    price.price = req.body.price;
                }
             }

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
            for (let [i, price] of data.entries()) {
                if (price.id == priceId) {
                    data.splice(i, 1);
                }
             }
            //delete data[priceId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`prices id:${priceId} removed`);
            });
        },
            true);
    });
};

module.exports = priceRoutes;
