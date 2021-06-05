var api = require('./src/api.js').app;
const fs = require('fs');
const haineFilepath = './src/haine.json';

api.get('/', function (request, response) {
    response.json('NodeJS REST API');
});

api.get('/haine', function (request, response) {
    response.json(getHaine());
});

api.get('/haine/:id', function (request, response) {
    let haina = getHainaById(request.params.id);
    if (haina) response.json(haina);
    response.json('not found');
});

api.put('/haine', function (request, response) {
    response.json(request.body);
    saveHaina(request.body);

});

api.post('/haine', function (request, response) {

    let haine = [];
    try {
        haine = JSON.parse(fs.readFileSync(haineFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var selhaina = getHainaById(request.body.id)
    if (selhaina != null) {
        var pos = 0;
        for (var i = 0; i < haine.length; i++) {
            if (haine[i].id == request.body.id) pos = i;
        }
        haine[pos] = request.body;

    }
    var selhaina = getHainaById(request.body.id);
    if (selhaina != null) { haine[request.body.id - 1] = request.body };
    try {
        fs.writeFileSync(haineFilepath, JSON.stringify(haine));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }




    // cautam daca exista indexul de pe request.body
    // daca exista actualizam parametrii acestui produs/item
    // salvam in fisier produsele actualizate
    response.json('Haina Salvata cu succes');
});

api.delete('/haine/:index', function (request, response) {
    let haine = [];
    try {
        haine = JSON.parse(fs.readFileSync(haineFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var oof = 0;
    for (var i = 0; i < haine.length; i++) {
        if (haine[i].id == request.params.index) oof = i;
    }
    haine.splice(oof, 1);
    if (haine == null) console.log();
    else {
        try {
            fs.writeFileSync(haineFilepath, JSON.stringify(haine));// salvare json array in fisier
        } catch (err) {
            console.error(err)
        }
    }
    response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});

function getHaine() {
    let haine = [];
    try {
        haine = JSON.parse(fs.readFileSync(haineFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    return haine;
}

function saveHaina(haina) {
    let haine = getHaine();// citire json din fisier
    let maxId = getMaxId(haine);
    haina.id = maxId + 1;// generare id unic
    haine.push(haina);// adaugare masina noua in array
    try {
        fs.writeFileSync(haineFilepath, JSON.stringify(haine));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }
}

function getMaxId(haine) {
    let max = 0;
    for (var i = 0; i < haine.length; i++) {
        if (max < haine[i].id) {
            max = haine[i].id;
        }
    }
    return max;
}

function getHainaById(id) {
    let haine = getHaine();// citire json din fisier
    let selectedHaina = null;
    for (var i = 0; i < haine.length; i++) {
        if (id == haine[i].id) selectedHaina = haine[i];
    }
    return selectedHaina;
}
