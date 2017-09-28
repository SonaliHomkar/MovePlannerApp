
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var apikey = "AIzaSyBy3mZJCtJohfsPHqr57dOpfUB244BLhKM"

    var url = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" ;
    url = url + $("#street").val() + "," + $("#city").val();
    url = url + "&key=" + apikey
    alert("url : " + url);
     $body.append('<img class="bgimg" src="' + url + '">');
    
    var apikey = "af9a70d2bc004a6dab80108c038198f0"
    
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?q=' + $("#city").val() + '&sortnewest&api-key=' + apikey ;
    
    console.log(url)
    
    $.getJSON(url, function (data) {
        $nytHeaderElem.text('New york time article is about : ' + $("#city").val());
        var articles = data.response.docs;
        for (i = 0; i < articles.length - 1; i++) {
            var article = articles[i];
            $nytElem.append('<li class ="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main +
                '"</a>' +
                '<p>' + article.snippet + '</p>' + '</li>'
                );
        }
        console.log(data);

    }).error(function (e) {
        $nytHeaderElem.text('New york times article could not be loaded');

    });

    var wikirequesttimeout = setTimeout(function () {
        $wikiElem.text("Failed to get wikipidia resource");
    },8000);

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $("#city").val() + "&format=json&callback=wikicallback",
        dataType: "jsonp", 
        success: function (response) {
            var articles = response[1];
            var articleNames = response[3];
            for (i = 0; i < articles.length - 1; i++) {
                var article = articles[i];
                $wikiElem.append('<li class ="article">' +
                    '<a href="' + articleNames[i] + '">' + article + '</a>'
                    );
                console.log(articleNames[i]);
                clearTimeout(wikirequesttimeout);
            }
            
        }
       
    });
    
    return false;
};

$('#form-container').submit(loadData);
