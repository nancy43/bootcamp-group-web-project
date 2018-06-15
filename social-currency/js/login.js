"use strict";
const usd = 'USD';

let quotes = {};            // TODO: create a class to set/get quotes

let initQuotes = function() {
};

firebase.auth().onAuthStateChanged(function(user) {
    let dialog = document.querySelector("#login-dialog");

    if (user) {                         // User is logged in
        let user = firebase.auth().currentUser;

        $(".login-cover").hide();       // Hide login dialog
        dialog.close();

        if (user !== null) {
            firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                let userObj = snapshot.val();

            });
        } //end user not null
    } else {                                    // User is logged out
        $(".login-cover").show();               // Show login dialog
        dialog.showModal();
    } // end user
}); // end onAuthStateChanged

$(function() {
    initQuotes();
    
    $("#btn-login").click( (evt) => {           // LOGIN
        let email = $("#user-email").val();
        let pswd = $("#user-pswd").val();

        $("#login-progress").show();
        $("#btn-login").hide();

        firebase.auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {
            $("#msgLoginError").show().text(error.message);
            $("#login-progress").hide();
            $("#btn-login").show();
        });
        
        $("#login-progress").hide();
        $("#btn-login").show();
    }); // end click

    $("#btn-logout").click( (evt) => {          // LOGOUT
        firebase.auth().signOut().then(function() {
          console.log("logout successful")
        })
        .catch(function(error) {
          // TODO: Handle Errors here.
          console.log(`${error.code} - ${error.message}`);
        });
    }); // end click
}); // document ready