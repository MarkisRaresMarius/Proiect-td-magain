function users() {
    get = function () {
        return axios.get('http://localhost:3000/haine');
    };

    remove = function (index) {
        return axios.delete('http://localhost:3000/haine/' + index);
    };

    return {
        get: get,
        remove: remove
    };
}

