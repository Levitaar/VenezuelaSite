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
      words.push(test);
    }
    }

  }
  
  for (var i = 0; i < words.length; i++) {
    if ($('*[data-word="' + words[i] + '"]').length > 0) {
      var target = $('*[data-word="' + words[i] + '"]');
      target.css("font-size",target.data("fontsize")+10+"px");
      target.css("background-color","red");
      console.log(target.data("fontsize"));
      target.data("fontsize",(target.data("fontsize")+10));
      
    } else {
      var target = $('*[data-word="' + words[i] + '"]');
      $("body").append("<p data-word='" + words[i] + "' data-fontsize='20' style='font-size:20px; background-color: blue'>" + words[i] + "</p>");
      
    }
}
  
}).fail(function(err) {
  throw err;
});

