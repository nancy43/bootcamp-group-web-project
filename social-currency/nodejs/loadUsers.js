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

/*--
    It gets user's json object from API based on:
		(1) 2 countries Canada and Brazil
		(2) get 6 random users
		(3) retrieve only name, picture, and country
		
		Reference: https://randomuser.me/documentation
*/
let initApp = function() {
    clearUsersLogin();

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

let clearUsersLogin = function() {
    // list all users into Authentication DB
    admin.auth().listUsers(1000)
        .then(function(listUsersResult) {
            listUsersResult.users.forEach(function(userRecord) {
                // delete each user by UID
                deleteSingleUser(userRecord.toJSON().uid);
            });
        }).catch(function(error) {
            console.log("Error deleting all users:", error);
        })
    ; // END listUsers
    
    admin.database().ref('users').remove();     // clear "users" DB
};

let deleteSingleUser = function(uid) {
    admin.auth().deleteUser(uid).then(function() {
        console.log("Successfully deleted user");
    }).catch(function(error) {
        console.log("Error deleting user:", error);
    }); // END deleteUser
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
                'nat_withdraw'  : user.nat,
                'tot_withdraw'  : 1000,
                'nat_deposit'   : user.nat,
            };
            admin.database().ref('users/' + user.login.username).set(userObj);
        ; // END CreateUser
    });
};

initApp();