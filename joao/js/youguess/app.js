class YouGuess {
    constructor() {

        this.props = {
            title: 'Guess the gender',
            subtitle: 'Try to guess some genders!',
            backgroundColor: '#c4ede5',
            totalQuestions: 10,
            email: '',
            users: [],
            question: '',
            genderChoice: '',
            playerState: [],
            randomUnicode: ['🚀', '🎇', '🌊', '😺', '🍔'],
        }

        this.fetch = new FetchYouAPIs(this.props.totalQuestions);

        // initializes page elements
        this.createDOMElements();

        // initializes DOM elements and event handlers
        this.initDOMElements();

        // sets title, subtitle, questions number and background color
        this.setTheme();

    }

    createDOMElements() {
        const content = document.querySelector('#content');
        content.innerHTML = `
            
        <section class="card mb-3 card-body d-none" id="card-guess">
        <div class="d-flex border-bottom mb-5 pb-2">
            <h3 style="flex: 1;" id="name-country" ></h3>
            <h3 id="current-question"><h3>
        </div>

        <div id="gender-choice">
            <div class="btn-group-toggle mb-3">
                <label id="label-male" class="btn btn-outline-warning btn-lg" for="gender-choice-male" style="width: 130px;">
                    <i class="zmdi zmdi-male"></i> Male
                    <input type="radio" name="gender-choice" id="gender-choice-male" value="male" autoComplete="off">

                </label>

            </div>

            <div class="btn-group-toggle mb-5">
                <label id="label-female" class="btn btn-outline-warning btn-lg" for="gender-choice-female" style="width: 130px;">
                    <i class="zmdi zmdi-female"></i>
                    Female
                    <input type="radio" name="gender-choice" id="gender-choice-female" value="female" autoComplete="off">
                </label>
            </div>

        </div>

        <div class="row justify-content-center">
            <button id="play-next" class="btn btn-success " style="font-size: 1.9rem; width: 130px">
                <i class="zmdi zmdi-forward"></i> Next
            </button>
        </div>

    </section>

    <div class="row" id="card-intro">
        <div class="col-md-6 d-flex">
            <section class="card mb-3 card-body" id="card-info">
                <h3 class="card-title border-bottom mb-5 pb-2">Ok, so that's what we got</h3>

                <h5><span id="questions-number"></span> questions</h5>
                <h5>One Rule - Guess !</h5>
                <div class="input-group mb-3 mt-4">
                    <input type="email" class="form-control form-control-lg" id="user-email-input" placeholder="myemail@email.com">

                    <div class="input-group-append">
                        <button id="guess-button" class="btn btn-success" style="font-size: 1.9rem">
                            <i class="zmdi zmdi-play-circle-outline"></i> Play
                        </button>
                    </div>

                </div>

            </section>
        </div>
        <div class="col-md-6 d-flex">
            <section class="card mb-3 card-body" id="card-info">
                <h3 class="card-title border-bottom mb-2 pb-2 text-center">Wall of Guessers</h3>
                <div class="table-wrapper">
                    <table class="table" id="guessers-table">
                        <thead class="table-success">
                            <tr>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Nick</td>
                                <td>10 pts</td>
                            </tr>
                            <tr>
                                <td>Caio</td>
                                <td>9 pts</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>10 pts</td>
                            </tr>
                            <tr>
                                <td>Caio</td>
                                <td>9 pts</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>10 pts</td>
                            </tr>
                            <tr>
                                <td>Caio</td>
                                <td>9 pts</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>10 pts</td>
                            </tr>
                            <tr>
                                <td>Caio</td>
                                <td>9 pts</td>
                            </tr>
                            <tr>
                                <td>Nick</td>
                                <td>10 pts</td>
                            </tr>
                            <tr>
                                <td>Caio</td>
                                <td>9 pts</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
        `;
    }

    createResultsDOMElements() {
        const content = document.querySelector('#content');
        content.innerHTML = `
        <div class="row">
            <div class="col">
                <section class="card mb-3 card-body">
                    <div class="d-flex border-bottom mb-3 pb-1">
                        <h4 style="flex: 1;">You've got <span id="points"></span> pts</h4>
                        <button id="button-save" style="align-self: center;" class="btn btn-info mr-2">Save</button>
                        <button id="button-back" style="align-self: center;" class="btn btn-success">Back</button>

                    </div>

                    <div class="row" id="results">

                        
                    </div>
                </section>
            </div>
        </div>
        `;

        this.results = document.querySelector('#results');
        this.points = document.querySelector('#points');
        this.buttonSave = document.querySelector('#button-save');
        this.buttonBack = document.querySelector('#button-back');

        this.buttonSave.addEventListener('click', this.handleSave.bind(this));
        this.buttonBack.addEventListener('click',() =>{
            window.guess = new YouGuess();
        });
    }

    showResults(){
        const total = this.props.playerState.filter(value => value.isCorrect).length;
        this.points.innerHTML = total;
        const cards = this.props.playerState.map(({name, country, isCorrect}) => {
            return `
            <div class="col-sm-12 col-md-3 mb-3 d-flex">
                <div class="border card-body">
                    <p class="text-capitalize">${name}</p>
                    <p>${country}</p>
                    <h3 style="position: absolute; bottom: 5px;right: 25px;">${isCorrect ? '👍': '👎'}</h3>
                </div>
            </div>
            `;
        }).join('');
       
        this.results.innerHTML = cards;
    }

    handleSave(){

    }

    initDOMElements() {
        this.mainTitle = document.querySelector('#main-title');
        this.mainSubtitle = document.querySelector('#main-subtitle');
        this.userEmailInput = document.querySelector('#user-email-input');
        this.questionsNumber = document.querySelector('#questions-number');
        this.guessersTable = document.querySelector('#guessers-table');
        this.guessButton = document.querySelector('#guess-button');
        this.cardGuess = document.querySelector('#card-guess');
        this.cardIntro = document.querySelector('#card-intro');
        this.nameCountry = document.querySelector('#name-country');
        this.currentQuestion = document.querySelector('#current-question');
        // this.genderChoiceFemale = document.querySelector('#gender-choice-female');
        // this.genderChoiceMale = document.querySelector('#gender-choice-male');
        this.genderChoice = document.querySelector('#gender-choice');
        this.labelMale = document.querySelector('#label-male');
        this.labelFemale = document.querySelector('#label-female');
        this.playNextButton = document.querySelector('#play-next');

        //start handlers
        this.guessButton.addEventListener('click', this.handleGuess.bind(this));
        this.playNextButton.addEventListener('click', this.handleNextPlay.bind(this));
        this.genderChoice.addEventListener('click', this.handleGenderChoice.bind(this));

    }

    handleGenderChoice(event) {
        // prevents double execution of event, since event comes from label
        event.preventDefault();

        //get control value given that input is inside label
        const control = event.target.control;

        if (control !== undefined) {
            this.props.genderChoice = control.value;
            this.updateGenderUI();
        }
        // console.log(x);
    }

    updateGenderUI() {
        // TODO: work on this dumb logic
        if (this.props.genderChoice === '') {
            this.labelMale.classList.remove('btn-warning');
            this.labelFemale.classList.remove('btn-warning');
            this.labelMale.classList.add('btn-outline-warning');
            this.labelFemale.classList.add('btn-outline-warning');
        } else if (this.props.genderChoice === 'male') {
            this.labelFemale.classList.add('btn-outline-warning');
            this.labelMale.classList.remove('btn-outline-warning');
            this.labelFemale.classList.remove('btn-warning');
            this.labelMale.classList.add('btn-warning');
        } else if (this.props.genderChoice === 'female') {
            this.labelFemale.classList.remove('btn-outline-warning');
            this.labelMale.classList.add('btn-outline-warning');
            this.labelFemale.classList.add('btn-warning');
            this.labelMale.classList.remove('btn-warning');
        }
    }

    setTheme() {

        this.mainTitle.innerHTML = this.props.title;
        this.mainSubtitle.innerHTML = this.props.subtitle;
        this.questionsNumber.innerHTML = this.props.totalQuestions;
        document.body.style.backgroundColor = this.props.backgroundColor;

    }

    async handleGuess() {
        if (this.userEmailInput.value == '') {
            alert('You need to insert your email');
            return
        };

        try {
            const users = await this.fetch.getUsers();

            this.props.users = users;

            this.props.email = this.userEmailInput.value;
            this.cardGuess.classList.remove('d-none');
            this.cardIntro.classList.add('d-none');

            this.nextQuestion();
            this.renderQuestion();

        } catch (err) {
            console.log(err)
        }

    }

    handleNextPlay() {

        // verify if a gender was selected
        if (!this.isGenderSelected()) {
            alert('Select a gender');
            return;
        }

        this.updatePlayerState()

        // verify if it's over and update player state 
        if (this.nextQuestion()) {
            // clean male/female radio options
            this.updateGenderUI();

            this.renderQuestion();

        } else {
            // render final frame
            this.createResultsDOMElements();
            this.showResults();
        }

    }

    isGenderSelected() {
        return this.props.genderChoice === '' ? false : true;
    }

    nextQuestion() {
        if (!this.props.users.length) {
            return false;
        }

        // pop question from props
        this.props.question = this.props.users.pop();

        // reset actual gender choice
        this.props.genderChoice = ''

        return true;
    }

    updatePlayerState() {

        // track gender choice, name, and country
        const isCorrect = this.props.question.gender === this.props.genderChoice ? true : false;
        const state = {
            name: this.props.question.name,
            country: this.props.question.country,
            isCorrect
        }

        this.props.playerState.push(state);

    }

    renderQuestion() {

        this.currentQuestion.innerHTML = `<span class="badge badge-success">${this.getQuestionNumber()}</span>`;
        this.nameCountry.innerHTML =
            `My name is <span class="text-capitalize">${this.props.question.name}</span>, I'm from ${this.props.question.country}`;

    }

    renderEnd() {
    }

    getQuestionNumber() {
        return (this.props.totalQuestions) - this.props.users.length;
    }
}