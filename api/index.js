const express = require('express');
const bodyParser = require('body-parser');
const port = 5000
var fs = require('fs');

const app = express()
var allowCrossDomain = (request, response, next) => {
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Headers", "*");
    request.header('Cache-Control', 'no-cache');
    request.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    response.header('Cache-Control', 'no-cache');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
}

app.use(allowCrossDomain)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.get('/query', (req, res) => {
    let rawdata = fs.readFileSync('stat.json');
    let student = JSON.parse(rawdata);

    res.json(student)
})

app.post('/save', (req, res) => {
    const nn = {
        name: req.body.name,
        uv: req.body.uv,

    }
    let rawdata = fs.readFileSync('stat.json');
    let st = JSON.parse(rawdata);
    st.push(nn)

    let data = JSON.stringify(st);
    fs.writeFileSync('stat.json', data);



    res.sendStatus(200)
})

app.listen(port, () => console.log(` on port ${port}!`))