class WeGuess {
    constructor() {

        this.props = {
            compliments: [
                'an amazing', 'an excelent', 'a strong', 'a famous', 'a great'
            ],
            cardInfo: true,
            finalMessage: true,
        }


        // initializes class to fetch data from APIs
        this.fetch = new FetchWeAPIs();
        // initializes DOM elements and event handlers
        this.initDOMElements();

        // retrieves country data from api and fill country-select
        this.fetch.getContriesData().then(data => {

            this.fillCountrySelect(data);

        });

        this.render();
    }

    initDOMElements() {
        //select dom elements
        this.userNameInput = document.querySelector('#user-name-input');
        this.countrySelect = document.querySelector('#country-select');
        this.guessButton = document.querySelector('#guess-button');
        this.playAgainButton = document.querySelector('#play-again-button');
        this.cardInfo = document.querySelector('#card-info');
        this.cardGuess = document.querySelector('#card-guess');
        this.successFind = document.querySelector('#success-find');
        this.failFind = document.querySelector('#fail-find');
        this.guessPercentage = document.querySelector('#guess-percentage');
        this.guessGender = document.querySelector('#guess-gender');

        //start handlers
        this.guessButton.addEventListener('click', this.guessHandler.bind(this));
        this.playAgainButton.addEventListener('click', this.playAgainHandler.bind(this));
    }

    // fill select component with countries data
    fillCountrySelect(data) {

        const countries = data.map(d => `<option value="${d.code}">${d.name}</option>`).join(' ');
        this.countrySelect.innerHTML += countries;
    }

    guessHandler() {
        const user = this.userNameInput.value;
        const country = this.countrySelect.value;

        this.fetch.getGuess(user, country)
            .then(data => {
                const compliments = this.props.compliments;
                
                // verifies whether a name was matched
                if(this.props.finalMessage = data.gender == null ? false : true){
                    
                    // defines accuracy percentage
                    this.guessPercentage.innerHTML = `${data.probability * 100}%`

                    // picks a compliment and inserts into the DOM
                    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
                    this.guessGender.innerHTML = `${compliment} ${data.gender}`
                }
                
                
                this.props.cardInfo = false;
                this.render();
            })
            .catch(err => console.log(err))

       
    }

    playAgainHandler(){
        this.userNameInput.value = ''
        this.props.cardInfo = true;
        this.render();
    }

    render() {
        
        if (this.props.finalMessage) {
            this.successFind.classList.remove('d-none');
            this.failFind.classList.add('d-none');
        } else {
            this.successFind.classList.add('d-none');
            this.failFind.classList.remove('d-none');
        }
        
        if (this.props.cardInfo) {
            this.cardGuess.classList.add('d-none')
            this.cardInfo.classList.remove('d-none')
        } else {
            this.cardInfo.classList.add('d-none')
            this.cardGuess.classList.remove('d-none')
        }
    }

}

