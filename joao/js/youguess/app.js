class YouGuess{
    constructor() {
        
        // initializes page elements
        //this.createDOMElements();

        // initializes DOM elements and event handlers
        this.initDOMElements();
    }

    createDOMElements(){
        const content = document.querySelector('#content');
        content.innerHTML = `Hi`;
    }
}