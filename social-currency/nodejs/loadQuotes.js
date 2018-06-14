"use strict";

const fetch = require("node-fetch");

const usd = 'USD';
let quotes = {};            // TODO: create a class to set/get quotes
/* Sample quote object formated:
	{
		"USD": { "CAD":1.299810, "BRL":3.719599 }
		"CAD": { "USD":0.769343, "BRL":2.861648 }	-- 1/USD->CAD , CAD->USD * USD->BRL
		"BRL": { "USD":0.769343, "CAD":2.861648 }	-- 1/USD->BRL , BRL->USD * USD->CAD
	}
*/
let initQuotes = function() {
    const web_site		= 'http://apilayer.net/api/';
    const endpoint 		= 'live'
    const access_key 	= '01daf97ed23634986ca1ce507dde70e7';
    const currencies 	= 'AUD,BRL,CAD,CLP';
    const url			= web_site + endpoint + '?access_key=' + access_key + '&currencies=' + currencies;

    console.log(url);
    fetch(url).then( response => {
        return response.json();
    })
    .then( jsonObj => {
        console.log(jsonObj);
        buildUsdQuote(jsonObj);             // Build USD quotes received from API
        buildOthersQuotes();                // Format others exchange rates
    })
    .catch( err => {
        console.log("error calling apilayer");
    });
};

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
};
initQuotes();