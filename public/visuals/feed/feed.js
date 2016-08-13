document.addEventListener('DOMContentLoaded', init);
var xmlHttp = null;
var container;
var twitterUrl = "https://api.twitter.com/1.1/search/tweets.json?q=%23click&result_type=recent"

function init(){
  container = document.getElementById("container");

  // fetchTweets();
}

function fetchTweets(){

  $.getJSON(twitterUrl, function(data){
    console.log(data);
  });
}

function parse(text){
  console.log(text);
}

window.setTimeout(function(){
  $("iframe#twitter-widget-0").contents().find('head').append('<style>img.Avatar{display:none !important;}body{color:black;}span.Identity-Name{display:none; !important}div.timeline-Tweet-brand{display:none;}div.Icon{display:none;}footer.timeline-footer{display:none;}h1.timeline-Header-title{text-align:center;color: black;}</style>');
}, 1000);
