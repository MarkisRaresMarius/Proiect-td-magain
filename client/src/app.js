function run() {
    let indexComponent = new Vue({
        el: '#app',
        data: {
            haine: [],
            usersService: null,
            message: ''
        },
        created: function () {
            this.usersService = users();
            this.usersService.get().then(response => (this.haine = response.data));
        },
        methods: {
            deleteHaina: function (id) {
                console.log('HTTP DELETE spre backend, haina: ' + id);
                this.usersService.remove(id).then(response => {
                    this.usersService.get().then(response => (this.haine = response.data));
                });
            },
        }
    });


}

document.addEventListener('DOMContentLoaded', () => {
    run();
});

