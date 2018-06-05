var marvel = {
render: function() {
var message = document.getElementById("message");
$.ajax({
    url: url,
    type: "GET",
    beforeSend: function() {
        message.innerHTML = "loading.."
    },
    complete: function() {

    }
});
}
};
marvel.render();