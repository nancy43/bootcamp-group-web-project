
class Guess{
    constructor() {
        
       
        // initializes class to fetch data from APIs
        this.fetch = new FetchAPIs();
        // initializes DOM elements and event handlers
        this.initDOMElements();

        // retrieves country data from api and fill country-select
        this.fetch.getContriesData().then(data => {
            
            this.fillCountrySelect(data);
            
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

}

window.onload = () => {
    window.app = new Guess();
  };