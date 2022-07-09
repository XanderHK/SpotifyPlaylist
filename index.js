const express = require('express');
const { fetchPlaylist } = require('./utils');
const app = express();
const path = require("path");
const router = express.Router();

// Sets public directory to be used in the views
app.use(express.static(__dirname + '/public'));

// Sets the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Describes what to do when the root route is hit by a get request.
router.get("/", async (req, res) => {
    // Fetch the data from a playlist by id
    const [result, err] = await fetchPlaylist('7dxkIBkfxlYjPS5Pcu6SAs')

    if (err) return

    // Iterates over the track items and transforms it into an array of objects that we can use in the view.
    const trackData = []
    for (const track of result.data.tracks.items) {
        trackData.push({ name: track.track.name, preview: track.track.preview_url, image: track.track.album.images[0].url, spotify_url: track.track.external_urls.spotify })
    }

    // Render the index.ejs view and pass the data from the playlist
    res.render("index", {
        trackData: trackData
    });
});

app.use('/', router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`)
})

