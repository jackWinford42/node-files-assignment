const fs = require('fs');
const axios = require('axios');

arg = process.argv[2]
argThree = process.argv[3]
argFour = process.argv[4]

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        resolve(data);
    })
}

function webCat(url) {
    axios
        .get(url)
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            console.log(error)
        })
}

function resolve(input) {
    if (process.argv[2] == '--out') {
        fs.writeFile(`/home/jw/Programs/SpringBoard/node-files/${argThree}`, input, err => {
            if (err) {
                console.error(err)
                return
            }
        })
    } else {
        console.log(input)
    }
}

if (arg == '--out') {
    if (argFour.slice(0,8) == 'https://' || argFour.slice(0,7) == 'http://') {
        // not sure why url only writes a [object Object] to the file even though
        // the full page html can be printed to the page
        webCat(argFour)
    } else {
        cat(argFour)
    }
} else {
    if (arg.slice(0,8) == 'https://' || arg.slice(0,7) == 'http://') {
        webCat(arg)
    } else {
        cat(arg)
    }
}
