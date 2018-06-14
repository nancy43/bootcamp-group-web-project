// DEPENDENCIE ==> npm install firebase-admin --save
//
// DEPENDENCIE ==> npm install node-fetch --save
//          https://www.npmjs.com/package/node-fetch

let admin = require("firebase-admin");
let fetch = require("node-fetch");

var serviceAccount = require("./../data/my-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-currency-community.firebaseio.com"
});

let initApp = function() {
	const url = 'https://randomuser.me/api/?results=50&nat=au,ca,ch,br,us&inc=login,name,email,picture,nat,phone';

	fetch(url)
		.then( response => {
			return response.json();
		}).then( data => {
			addUserToFirebase(data.results);    // add returned users into FB
// 		}).catch( err => {
// 			console.log("error");		        // TODO: catch error
		})
	; // END fetch
};

let formatName = function(fName, lName) {
    fName = fName.charAt(0).toUpperCase() + fName.substr(1);
    lName = lName.charAt(0).toUpperCase() + lName.substr(1);
    return `${fName} ${lName}`;
};

let addUserToFirebase = function(users) {
    users.map( user => {
        admin.auth().createUser({
            displayName:    formatName(user.name.first, user.name.last),
            photoURL:       user.picture.large,
            email:          user.email,
            uid:            user.login.username,// set UID as login.username
            password:       "password",         // FIXED password
            emailVerified:  true,
            disabled:       false
    
            }).then(function(userRecord) {
                console.log("Successfully created new user:", user.login.username);

            }).catch(function(error) {
                console.log("Error creating new user:", user.login.username);
            })
            
            let userObj = {
                'phone'         : user.phone,
                'nat_withdraw'  : getFormattedNat(user.nat),
                'tot_withdraw'  : getRandomVal(),
                'nat_deposit'   : getRndCountry(user.nat),
            };
            admin.database().ref('users/' + user.login.username).set(userObj);
        ; // END CreateUser
    });
};

initApp();