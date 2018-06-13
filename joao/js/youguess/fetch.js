class FetchYouAPIs {
    constructor() {
        this.props = {
            apiRandomUser: 'https://randomuser.me/api/',
            inc: 'gender,name,nat',
            qtd: 10
        }
    }

    async fetchUsers() {
        const data = await fetch(`${this.props.apiRandomUser}/?results=${this.props.qtd}&inc=${this.props.inc}`);
        return data.json();
    }

    async getUsers() {
        const results = await this.fetchUsers();
        return results.results;
    }

}