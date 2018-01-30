var searchTerm= "2016 Elections";
var beginDate="1900";
var endDate="2017";
var numArt;

var searchNyt = function(){

 var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

 url += '?' + $.param({
   'api-key': "985ea6ce339c4406a9745e2267215aac",
   'q': searchTerm,
   'begin_date': beginDate+"0101",
   'end_date': endDate+"0101",
   'fl': "headline, snippet, byline, web_url"
 });
 $.ajax({
   url: url,
   method: 'GET',
 }).done(function(result) {
   var search = result.response.docs;
   console.log(searchTerm+beginDate+endDate);
   console.log(search);
   for (var i = 0; i < numArt; i++) {
     var headline= search[i].headline.main;
     var articleURL= search[i].web_url;
     var snippet= search[i].snippet;
     var author= search[i].byline.original;

     var div = $("<div>");
     div.attr("class", "articleWrapper");
     $(div).append("<a class='title' href="+articleURL+">"+headline+"</a>");
     $(div).append("<div class='preview'>"+snippet+"</div>");
     $(div).append("<div class='writer'>"+author+"</div>");
     $("#articles").append(div);
     $("#articles").append("<br>");
   }
 }).fail(function(err) {
   throw err;
 });
};

$("#search").on("click", function(event){
 event.preventDefault();
 console.log("hi");
 console.log($("#searchTerm"));
 $(".articleContainer").empty();
 if ( !$("#searchTerm").val()) {
       alert("please fill search field");
  }
  else {
   searchTerm= $("#searchTerm").val();
        if ( $("#startInput").val() !== "") {
              beginDate =$("#startInput").val();
           }
            else {
                  beginDate = 2000;
           }

        if ( $("#endInput").val() !== "") {
                endDate =$("#endInput").val();
           }
           else {
               endDate = 2017;
           }
        numArt= $("#inputGroupSelect01").val();
          searchNyt();
 }
});

$("#buttonClear").on("click", function(event){
 console.log("coucou");
 event.preventDefault();
 $("#articles").empty();
});