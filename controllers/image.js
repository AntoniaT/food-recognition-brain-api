const Clarifai = require('clarifai');

// using my API key from clarifai
const app = new Clarifai.App({
apiKey: 'c0f271bd3ec340bc84e08b587ce502f9'
});
const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FOOD_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImagePut,
    handleApiCall
};