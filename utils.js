const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET, BASE_URI } = require('./cfg');

/**
 * Makes a request to the Spotify API to get an access token.
 * https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
 * @returns {Promise<{access_token: string, expires_in: number}>}
 */
const authorize = async () => {
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        json: true
    })

    const headers = {
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', data.toString(), headers)
        return [res.data, null]
    } catch (err) {
        return [null, err]
    }
}

/**
 * Fetches a playlist from the Spotify API, using a playlist id and the access_token.
 * @param {string} playlistId 
 * @returns 
 */
const fetchPlaylist = async (playlistId) => {
    try {
        const [result, err] = await authorize();

        if (err) {
            throw new Error('Something went wrong during authorization.')
        }

        const res = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + result.access_token

            }
        })

        return [res, null]
    } catch (err) {
        return [null, err]
    }
}

// Exports the functions
exports.authorize = authorize
exports.fetchPlaylist = fetchPlaylist