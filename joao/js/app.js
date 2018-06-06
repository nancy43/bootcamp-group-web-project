
class Guess{
    constructor() {
       
        this.props = {
            compliments: [
                'an amazing', 'an excelent', 'a strong', 'a famous', 'a great'
            ],
            cardInfo: true,
        }


        // initializes class to fetch data from APIs
        this.fetch = new FetchAPIs();
        // initializes DOM elements and event handlers
        this.initDOMElements();

        // retrieves country data from api and fill country-select
        this.fetch.getContriesData().then(data => {
            
            this.fillCountrySelect(data);
            
        });

        this.render();
    }

    initDOMElements(){
        //select dom elements
        this.userNameInput = document.querySelector('#user-name-input');
        this.countrySelect = document.querySelector('#country-select');
        this.guessButton = document.querySelector('#guess-button');
        this.cardInfo = document.querySelector('#card-info');
        this.cardGuess = document.querySelector('#card-guess');

        //start handlers
        this.guessButton.addEventListener('click', this.guessHandler.bind(this));
    }

    // fill select component with countries data
    fillCountrySelect(data){
       
        const countries = data.map(d => `<option value="${d.code}">${d.name}</option>`).join(' ');
        this.countrySelect.innerHTML += countries;
    }

    guessHandler(){
        console.log(this.userNameInput.value);
        console.log(this.countrySelect.value);
        this.props.cardInfo = false;
        this.render();
    }

    render(){
        if (this.props.cardInfo) {
            this.cardGuess.classList.add('d-none')
            this.cardInfo.classList.remove('d-none')
        }else{
            this.cardInfo.classList.add('d-none')
            this.cardGuess.classList.remove('d-none')
        }
    }

}

window.onload = () => {
    window.app = new Guess();
  };