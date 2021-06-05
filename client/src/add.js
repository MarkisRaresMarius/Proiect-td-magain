function run() {
    new Vue({
        el: '#addH',
        data: {
            id: 'default',
            haina: {}
        },
        created: function () {
        },
        methods: {
            addHaina: function () {

                this.haina={"id": 0,
                    "name": document.getElementById("name").value,
                    "brand": document.getElementById("brand").value,
                    "color": document.getElementById("color").value,
                    "season": document.getElementById("season").value,
                    "material": document.getElementById("material").value,
                    "flamable": document.getElementById("flamable").value,
                    "info": document.getElementById("info").value,
                    "sezon_aparitie": document.getElementById("sezon_aparitie").value,
                    "price": document.getElementById("price").value};

                return axios.put('http://localhost:3000/haine', this.haina).then(
                    (response) => {
                        this.message = response.data;
                        console.log(this.message); // saved
                        alert("Added!");
                        window.location = 'index.html';
                    }
                );

            },
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});

