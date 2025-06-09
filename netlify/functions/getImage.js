// This is Node.js code that will run on a Netlify server, not in the browser.

// The modern way to import 'node-fetch' in a Netlify function
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event) {
    // Get the secret keys from environment variables (set in Netlify's UI)
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

    // Get the search term from the front-end's request URL
    const searchTerm = event.queryStringParameters.q || 'abstract background';

    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchTerm)}&searchType=image&imgSize=medium&num=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Send the data back to the front-end
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch image from Google API' })
        };
    }
};
