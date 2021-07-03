const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        console.log(data);
    })
}

function webCat(url) {
    axios
        .get(url)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
}

arg = process.argv[2]
if (arg.slice(0,8) == 'https://') {
    webCat(arg)
} else {
    cat(arg)
}