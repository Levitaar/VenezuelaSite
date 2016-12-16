var stopwords = ["the", "by", "was"];
var words = [];
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "78fcd6130b0b4c54a62914ba84ce96b0",
  'q': "venezuela",
  'end_date': "20130419"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  
  for (var i = 0; i < result.response.docs.length; i++) {

  if (result.response.docs[i].lead_paragraph) {
    var leadPara = result.response.docs[i].lead_paragraph.split(" ");
    for (var j = 0; j < leadPara.length; j++) {
      var test = leadPara[j].replace('"', "");
      var coma = test.replace(",", "");
      var dot = coma.replace(".", "");
      if(dot !== "the" && dot !== "was" && dot !== "THIS" && dot !== "it" && dot !== "he" && dot !== "with" && dot !== "and" && dot !== "of" && dot !== "a" && dot !== "has" && dot !== "in" && dot !== "that" && dot !== "THE" && dot !== "on" && dot !== "from" && dot !== "to" && dot !== "by" && dot !== "an") {
        words.push(dot);
        console.log(words);
      }
    }
    }

  }
  
  for (var i = 0; i < words.length; i++) {
    if ($('*[data-word="' + words[i] + '"]').length > 0) {
      var target = $('*[data-word="' + words[i] + '"]');
      target.css("font-size",target.data("fontsize")+30+"px");
      target.css("background-color","red");
      target.css("transform","rotate(0deg)");
      console.log(target.data("fontsize"));
      target.data("fontsize",(target.data("fontsize")+30));
      
    } else {
      var target = $('*[data-word="' + words[i] + '"]');
      $("body").append("<p data-word='" + words[i] + "' data-fontsize='20' style='font-size:30px; background-color: blue ; margin:5px ; display: inline-block; transform: rotate(90deg) ;'>" + words[i] + "</p>");
      
    }
}
  
}).fail(function(err) {
  throw err;
});

