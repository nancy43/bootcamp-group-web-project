"use strict";
let $ = function (id) {
    return document.getElementById(id);
}

const usd = 'USD';

let quotes = {};

let initQuotes = function() {
	const web_site		= 'http://apilayer.net/api/';
	const endpoint 		= 'live'
	const access_key 	= '01daf97ed23634986ca1ce507dde70e7';
	const currencies 	= 'AUD,BRL,CAD,CLP';
	const url			= web_site + endpoint + '?access_key=' + access_key + '&currencies=' + currencies;

	console.log(url);
	fetch(url)
		.then( response => {
			return response.json();
		})
		.then( jsonObj => {
			console.log(jsonObj);
			buildUsdQuote(jsonObj);		// Build USD quotes received from API
			buildOthersQuotes();		// Format others exchange rates
			initOptionsFrom();			// Populate options at combo box FROM
		})
		.catch( err => {
			console.log("error");
		});
}

let buildUsdQuote = function(jsonObj) {
	// Original: "quotes":{"USDCAD":1.29981,"USDBRL":3.719599,"USDUSD":1}
	let newObj = {};
	for (let key in jsonObj.quotes) {
		if (key.substr(3,3) !== usd) {
			newObj[key.substr(3,3)] = jsonObj.quotes[key];
		}
	}
	// Expected: quotes["USD"] = { "CAD":1.29981, "BRL":3.719599 }	
	quotes[usd] = newObj;
}

let buildOthersQuotes = function() {
	let newObj, fromSymbol, fromRate;
	
	for (let symbol in quotes[usd]) {			// forEach USD currency
		newObj = {};							// clear Obj

		fromSymbol = symbol;
		fromRate = quotes[usd][symbol];

		// convert to USD exchange rate to 6 decimal places
		newObj[usd] = parseFloat((1 / quotes[usd][symbol]).toFixed(6));

		for (let symbolLoop in quotes[usd]) {	// forEach USD currency AGAIN
			if (symbolLoop !== symbol) {		// Others currency exchange
				newObj[symbolLoop] = parseFloat((newObj[usd] * 
									quotes[usd][symbolLoop]).toFixed(6));
			}
		}
		quotes[fromSymbol] = newObj;
	}	
}

let initOptionsFrom = function() {
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Choose';

	let cmbFrom = $("currency_from");
	cmbFrom.length = 0;
	cmbFrom.add(defaultOption);			// set default option
	cmbFrom.selectedIndex = 0;

	let option;
	for (let symbol in quotes) {		// Populates symbols
		option = document.createElement('option');
		option.text = symbol;
		option.value = symbol;
		cmbFrom.add(option);
	}	
}

window.onload = function () {
    //$("currency_from").onchange = refreshCmbTo;
    //$("currency_to").onchange = refreshAmountTo;
    //$("amount_from").onchange = refreshAmountTo;
	initQuotes();
}