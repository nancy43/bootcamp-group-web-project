var marvel = {
	render: function() {
		var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b89508034bfeab38dfa4d135c6c96e26&hash=d3a36f12dcdbe4c6fb5f01f854adba63"
		var message = document.getElementById("message");
        var footer = document.getElementById("footer");
        var marvelContainer = document.getElementById("marvel-container"); 
	  $.ajax({
		url: url,
		type:"GET",
		beforeSend: function() {
			message.innerHTML = "Loading...";
		},
		complete: function() {
			 message.innerHTML = "Successfully Done!";
		},
		success: function(data) {
			footer.innerHTML = data.attributionHTML; 
			var string = "";
			string += "<div class ='row'>";
			 

	  }
			 }
			 marvelContainer.innerHTML = string;
		},
		error: function() {
			message.innerHTML = "we are sorry!";
		}
	});
}
};
marvel.render(); 