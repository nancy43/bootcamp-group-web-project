
class Guess{
    constructor() {
        
        this.props = {
            apiGenderize: 'https://api.genderize.io',
            apiRestContries: 'https://restcountries.eu/rest/v2/alpha',
        }
        
        // initializes DOM elements and event handlers
        this.initDOMElements();

        // retrieves country data from api and fill country-select
        this.getContriesData().then(data => {
            this.props.countries = data;
            this.fillCountrySelect(this.props.countries);
            
        });

    }

    initDOMElements(){
        //select dom elements
        this.userNameInput = document.querySelector('#user-name-input');
        this.countrySelect = document.querySelector('#country-select');
        this.guessButton = document.querySelector('#guess-button');

        //start handlers
        this.guessButton.addEventListener('click', this.guessHandler.bind(this));
    }

    fillCountrySelect(data){
       
        const countries = data.map(d => `<option value="${d.code}">${d.name}</option>`).join(' ');
        this.countrySelect.innerHTML += countries;
    }

    guessHandler(){
        console.log(this.userNameInput.value);
        console.log(this.countrySelect.value);
    }

    // fetch all valid countries codes from genderize
    async fetchCountriesCodes(){
        const data = await fetch(`${this.props.apiGenderize}/countries`);
        return data.json();
    }

    //fetch all country names given a list of codes
    async fetchCountriesNames(codes){
        const data = await fetch(`${this.props.apiRestContries}?codes=${codes}`);
        return data.json();
    }

    async getCountriesCode(){
        const codes = await this.fetchCountriesCodes();
        return codes.countries.join(';');
    }

    async getContriesData(){
        const codes = await this.getCountriesCode();
        const data = await this.fetchCountriesNames(codes);
        
        return data
            .filter(d => d !== null)
            .map(value =>  { 
                return {code: value.alpha2Code, name: value.name}
            });
    }
}

window.onload = () => {
    window.app = new Guess();
  };