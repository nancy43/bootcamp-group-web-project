function newll() {
    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }
    const ul = document.getElementById('weather');
    const url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/30.33,70.666?units=ca&callback=?';
    fetch(url, {
            method: 'GET'
        })
        .then((resp) => resp.json()) //Transform the data into json
        .then(function(data) {
            let weather = data.latitude; //Get the results
            return weather.map(function(weather) { //Create the elements we need
                let div = createNode('div'),
                    p = createNode('p')
                p.innerHTML = weather;
                console.log(weather);
                append(div, p);

                append(ul, div); //Append all our elements
            })
        })
        .catch(function(error) {
            console.log(error); //Show on console log the error
        });
}