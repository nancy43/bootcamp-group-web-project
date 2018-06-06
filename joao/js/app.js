
class Guess{
    constructor() {
        this.initDOMElements();

        this.props = {
            apiGenderize: 'https://api.genderize.io',
            apiRestContries: 'https://restcountries.eu/rest/v2/alpha',
        }

        this.getCountriesCode();

    }

    initDOMElements(){
        //select dom elements
        this.userNameInput = document.querySelector('#user-name-input');
        this.countrySelect = document.querySelector('#country-select');
        this.guessButton = document.querySelector('#guess-button');

        //start handlers
        this.guessButton.addEventListener('click', this.guessHandler.bind(this));
    }

    guessHandler(){
        console.log(this.userNameInput.value);
        console.log(this.countrySelect.value);
    }

    // fetch all valid countries codes from genderize
    async fetchCountriesCodes(){
        return await fetch(`${this.props.apiGenderize}/countries`).then(data => data.json());
    }

    getCountriesCode(){
        this.fetchCountriesCodes().then(data => console.log(data));
    }
}

window.onload = () => {
    window.app = new Guess();
  };