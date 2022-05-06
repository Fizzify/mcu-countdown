const express = require("express");
const https = require("https");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const url = "https://www.whenisthenextmcufilm.com/api";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const filmData = JSON.parse(data);
      const daysData = filmData.days_until;
      const posterData = filmData.poster_url;
      const filmTitleData = filmData.title;
      const filmTypeData = filmData.type;
      const filmReleaseData = filmData.release_date;
      const filmOverviewData = filmData.overview;

      res.render("index", {
        daysLeft: daysData,
        poster: posterData,
        title: filmTitleData,
        type: filmTypeData,
        releaseDate: filmReleaseData,
        overview: filmOverviewData,
      });
    });
  });
});

app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000."));
