class WeGuess {
    constructor() {

        this.props = {
            compliments: [
                'an amazing', 'an excelent', 'a strong', 'a famous', 'a great'
            ],
            cardInfo: true,
            finalMessage: true,
            title: 'Your Gender',
            subtitle: 'Let us try to figure out your gender',
            backgroundColor: 'blue'
        }

        // initializes class to fetch data from APIs
        this.fetch = new FetchWeAPIs();

        // initializes page elements
        this.createDOMElements();

        // initializes DOM elements and event handlers
        this.initDOMElements();

        // sets title, subtitle and background color
        this.setTheme();

        // retrieves country data from api and fill country-select
        this.fetch.getContriesData().then(data => {

            this.fillCountrySelect(data);

        });

        this.render();
    }

    createDOMElements(){
        const content = document.querySelector('#content');
        content.innerHTML = `        
        <section class="card mb-3 card-body" id="card-info">

        <div class="row">

            <div class=" col-sm-12 col-md-6">
                <label for="user-name-input" class="col-form-label col-form-label-lg">Please, provide your name</label>

                <div class="input-group mb-3">

                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="zmdi zmdi-account" style="color: #3498DB;"></i>
                        </span>
                    </div>
                    <input type="email" class="form-control form-control-lg" id="user-name-input">

                </div>
            </div>

            <div class="col-sm-12 col-md-6 ">
                <label for="country-select" class="col-form-label col-form-label-lg">What's your country?</label>
                <div class="input-group mb-3">

                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="zmdi zmdi-pin" style="color: #3498DB;"></i>
                        </span>
                    </div>
                    <select id="country-select" class="form-control form-control-lg"></select>
                </div>
            </div>

        </div>



        <div class="row justify-content-center" style="margin: 50px 0 10px 0">
            <button id="guess-button" class="btn btn-info" style="font-size: 1.9rem">
                <i class="zmdi zmdi-mail-send"></i> Go and Guess
            </button>

        </div>
    </section>

    <section class="card mb-3 card-body d-none" id="card-guess">
        <div>

            <div id="success-find">
                <h4>Ok, so that's what we got...</h4>
                <h3 class="text-info text-center" style="margin: 20px;">
                    We are
                    <span id="guess-percentage" class="display-4 font-weight-bold"></span>
                    sure that your are
                    <span id="guess-gender" class="display-4 font-weight-bold"></span>

                </h3>
            </div>

            <div id="fail-find" class="d-none">
                <h3 class="text-info text-center" style="margin: 20px;">
                    We are very sorry, but we can't tell your gender!

                </h3>
            </div>



        </div>

        <div class="row justify-content-center" style="margin: 50px 0 10px 0">
            <button id="play-again-button" class="btn btn-info" style="font-size: 1.9rem">
                <i class="zmdi zmdi-mood"></i> Play again
            </button>

        </div>
    </section>
        `
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

    setTheme(){
        const mainTitle = document.querySelector('#main-title');
        const mainSubtitle = document.querySelector('#main-subtitle');
        mainTitle.innerHTML = this.props.title;
        mainSubtitle.innerHTML = this.props.subtitle;

        document.body.style.backgroundColor = '#c7e6fa';
        
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

