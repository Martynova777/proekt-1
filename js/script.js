
var card ="<a href='https://www.w3schools.com/image' download class='uk-card uk-card-default uk-width-1-5 uk-margin-remove uk-padding-remove'><div class='js-card uk-background-cover uk-height-small'></div></a>"
var cards = $(".js-cards");
var button = $(".js-button");
var input = $(".js-input");
var download = $ (".js-download");
var apikey = "ebc337db5d297bbba7010389abf52b154db6f5bb93ae67a45ff64f3cb052456f"
var link = "https://api.unsplash.com/search/photos/?client_id=";
var param = "&query=";

button.on("click", addCard); //ссылка на функцию

download.on("click", function() {
    cards
    .find(".card-active")
        .wrap("<a href='#'></a>")
        .parent()
        .attr("download","true")
        .click();
})

 input.on("keydown",function(e){

if(e.keyCode == "13") {
    addCard();
}

})

function addCard () {
    cards.empty();
    if(input.val() != "") { // если значение инпата не равно пустой строке

        var query = link + apikey + param + input.val()
  

$.getJSON(query, function(data) {

    for(var i = 0; i < data.results.length; i++) {
        var img = data.results[i].urls;
        //console.log(img.thumb)
        cards
        .append(card)
        .find(".js-card")
        .last()
       //.wrap ("<a href='#'></a>")//
        .css({"background-image":"url('" + img.thumb + "')"})
        .attr("data-link", img.full);
    }

//*console.log(data) // объект

})
}
  }

cards.on("click", ".js-card", function(){ // делегирование - перенос события клик от родительского элемента, на дочерний подгружаемую карточку.
   //window.open( $(this).attr("data-link"));//
$(this).toggleClass("card-active");
})

