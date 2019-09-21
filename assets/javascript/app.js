const accountDetails = document.querySelector('#account-body');
const showAccountDetails = (user) => {
  if (user) {
    // account info
    console.log(user)
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    console.log(html);
    accountDetails.innerHTML = html;
  } else {
    // hide account info
    accountDetails.innerHTML = '';
  };
};

$(document).ready(function() {
  $(".newsWrapper").empty();
  search = "TSLA";
  console.log(search);
  queryURL =
    "https://newsapi.org/v2/everything?qInTitle=" +
    search +
    "&language=en&sortby=publishedAt&apiKey=df2279637a6742afb7f8f57de492e5c9";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.articles;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var newsDiv = $("<div>");
      var headline = $("<a>");
      var picture = $("<img>");
      if (results[i].urlToImage == null) {
        picture.attr("src", "../Market-View/images.png");
      } else {
        picture.attr("src", results[i].urlToImage);
      }
      picture.css("float", "left");
      picture.css("width", "320px");
      picture.css("height", "220px");
      picture.css("margin-top", "50px");
      headline.text(results[i].title);
      headline.attr("href", results[i].url);
      headline.attr("class", "headline");
      headline.css("font-size", "40px");
      headline.css("font-weight", "bolder");
      headline.css("margin-bottom", "20px");
      console.log(headline);
      newsDiv.append(headline);
      newsDiv.css("background-image", "url('../images/lightScratch.png')");
      newsDiv.attr("class", "news");
      newsDiv.css("height", "140px");
      var author = $("<h2>");
      if (results[i].author == null) {
        author.text("");
      } else {
        author.text("By:" + results[i].author);
      }
      author.css("float", "left");
      newsDiv.append(author);
      var description = $("<h4>");
      description.css("font-size", "40px");
      description.attr("class", "content");
      description.text(results[i].description);
      author.append(description);
      author.append(picture);
      $(".newsWrapper").append(newsDiv);
    }
  });
});

$(document).ready(function() {
  // taking in search term
  var queryURL =
    "https://api.worldtradingdata.com/api/v1/stock?symbol=TSLA&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // inputting data from worldtradingdata api
    .then(function(data) {
      // Clears all of the text-boxes
      $("#placeholder-stock-search-div").val("");

      // testing API functionality/object syntax
      console.log(data);
      console.log(data.data[0].symbol);

      // setting both daychange variables to green/red based on market data
      var dayChange = $("<td>");
      var dayChangePct = $("<td>");
      dayChangePct.text(data.data[0].change_pct);
      dayChange.text(data.data[0].day_change);
      if (data.data[0].day_change < 0) {
        dayChangePct.css("color", "red");
        dayChange.css("color", "red");
      } else {
        dayChangePct.css("color", "lightgreen");
        dayChange.css("color", "lightgreen");
      }

      var newRow = $("<tr>").append(
        $("<td>").text(data.data[0].symbol),
        $("<td>").text(data.data[0].price),
        $("<td>").text(data.data[0].day_high),
        $("<td>").text(data.data[0].day_low),
        $("<td>").text(data.data[0]["52_week_high"]),
        $("<td>").text(data.data[0]["52_week_low"]),
        $("<td>").text(data.data[0].volume),
        $("<td>").text(data.data[0].volume_avg),
        dayChange,
        dayChangePct
        // $("<td>").text(data.data[0].day_change),
        // $("<td>").text(data.data[0].change_pct),
      );
      // Append the new row to the table
      $(".table").append(newRow);
    });
});


$(document).on("click", "#submit-button", function() {
  $(".newsWrapper").empty();
  search = $("#search-bar")
    .val()
    .trim();
  console.log(search);
  queryURL =
    "https://newsapi.org/v2/everything?qInTitle=" +
    search +
    "&language=en&sortby=publishedAt&apiKey=df2279637a6742afb7f8f57de492e5c9";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.articles;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var newsDiv = $("<div>");
      var headline = $("<a>");
      var picture = $("<img>");
      if (results[i].urlToImage == null) {
        picture.attr("src", "../Market-View/images.png");
      } else {
        picture.attr("src", results[i].urlToImage);
      }
      picture.css("float", "left");
      picture.css("width", "320px");
      picture.css("height", "220px");
      picture.css("margin-top", "50px");
      headline.text(results[i].title);
      headline.attr("href", results[i].url);
      headline.attr("class", "headline");
      headline.css("font-size", "40px");
      headline.css("font-weight", "bolder");
      headline.css("margin-bottom", "20px");
      console.log(headline);
      newsDiv.append(headline);
      newsDiv.css("background-image", "url('../images/lightScratch.png')");
      newsDiv.attr("class", "news");
      newsDiv.css("height", "140px");
      var author = $("<h2>");
      if (results[i].author == null) {
        author.text("");
      } else {
        author.text("By:" + results[i].author);
      }
      author.css("float", "left");
      newsDiv.append(author);
      var description = $("<h4>");
      description.css("font-size", "40px");
      description.attr("class", "content");
      description.text(results[i].description);
      author.append(description);
      author.append(picture);
      $(".newsWrapper").append(newsDiv);
    }
  });
});

$(document).on("click","#submit-button", function(event) {
  event.preventDefault();

  // taking in search term
  var searchSymbol = $("#search-bar").val().trim();
  console.log(searchSymbol);

  // setting up get requests from worldtradingdata for table input
  var queryURL =
    "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
    searchSymbol +
    "&api_token=E9WkYOdirs63yl0rDrZNAnAfzIT9JEoTVrjDDedq2xeTTeROg4ZvtJy8HCUC";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // inputting data from worldtradingdata api
    .then(function(data) {
      // Clears all of the text-boxes
      $("#placeholder-stock-search-div").val("");

      // testing API functionality/object syntax
      console.log(data);
      console.log(data.data[0].symbol);

      // setting both daychange variables to green/red based on market data
      var dayChange = $("<td>");
      var dayChangePct = $("<td>");
      dayChangePct.text(data.data[0].change_pct);
      dayChange.text(data.data[0].day_change);
      if (data.data[0].day_change < 0) {
        dayChangePct.css("color", "red");
        dayChange.css("color", "red");
      } else {
        dayChangePct.css("color", "lightgreen");
        dayChange.css("color", "lightgreen");
      }

      var newRow = $("<tr>").append(
        $("<td>").text(data.data[0].symbol),
        $("<td>").text(data.data[0].price),
        $("<td>").text(data.data[0].day_high),
        $("<td>").text(data.data[0].day_low),
        $("<td>").text(data.data[0]["52_week_high"]),
        $("<td>").text(data.data[0]["52_week_low"]),
        $("<td>").text(data.data[0].volume),
        $("<td>").text(data.data[0].volume_avg),
        dayChange,
        dayChangePct
        // $("<td>").text(data.data[0].day_change),
        // $("<td>").text(data.data[0].change_pct),
      );
      // Append the new row to the table
      $(".table").append(newRow);
    });
});
