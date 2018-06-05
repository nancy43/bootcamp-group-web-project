var marvel = {
render: function() {
var message = document.getElementById("message");
$.ajax({
    url: url,
    type: "GET",
    beforeSend: function() {
        message.innerHTML = "Processing..."
    },
    complete: function() {

    }
});
}
};
marvel.render();