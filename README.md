# IsItDead - Website Pinger

**IsItDead** is a free tool to check the status of a given URL or IP, displaying any errors it might reveal.

[Live Demo](https://isitdead.xyz/)

![Screenshots](https://github.com/GlowSquid/isitdead/blob/master/screenshots.gif)

## Features

- Fully responsive single-page application
- Server-side rendered with next.js
- Uses Curl to check for errors, including 4xx and 5xx http status codes
- Validation to only allow quering URL's and IP's
- A [counter](https://isitdead.xyz/api/count) increments with each query

Star if you like it, and feel free to fork it.

Remember to `chmod 500 server/bin/curl.sh` and insert your own credentials to `server/dbconfigSAMPLE.js`.
