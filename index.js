#!/usr/bin/env node

const path = require("path");
const request = require('request');
const requestPromise = require('request-promise');
const fs = require('fs');

require('yargs') // eslint-disable-line
    .command('$0 <clientid> <id> [dest]', 'download an album', (yargs) => {
        yargs
            .positional('clientid', {
                describe: 'the client id you got after registering with Imgur, see README for more information',
                type: 'string',
            })
            .positional('id', {
                describe: 'id of Imgur album',
                type: 'string',
            })
            .positional('dest', {
                describe: 'destination directory to save files to',
                type: 'string',
                default: __dirname
            })
    }, (argv) => {
        download(argv.clientid, argv.id, argv.dest, argv.loglevel, argv.report);
    })
    .option('loglevel', {
        alias: 'l',
        describe: 'Level of logging 0 to 2',
        type: 'int',
        default: 1
    })
    .option('report', {
        alias: 'r',
        describe: 'Create a JSON metadata report of files and file data.',
        type: 'boolean',
        default: false
    })
    .argv

// Quick and dirty logger
function _getLogger(loglevel) {
    const noop = () => {};
    return {
        debug: (loglevel > 1 ? console.info : noop),
        info: (loglevel > 0 ? console.info : noop)
    };
}
function download(clientId, albumId, destination, loglevel, createReport) {

    const log = _getLogger(loglevel);

    log.debug(`Log level set to ${loglevel}.`);

    const options = {
        url: 'https://api.imgur.com/3/album/BsvH4/images',
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    };

    requestPromise(options)
        .then(function (r) {
            let images = JSON.parse(r).data;
            log.info(`Found ${images.length} images in album`);
            log.info(`Saving to ${destination}`);

            for(let i = 0; i < images.length; i++) {
                const image = images[i];
                const filename = `${image.id}.${image.type.replace(/(\w+\/)/, '')}`;
                const savePath = path.join(destination, '/', filename);

                log.debug(image);
                log.info(`Fetching ${image.link}`);

                request(image.link)
                .pipe(fs.createWriteStream(savePath));

                images.savepath = savePath;

            }

            if(createReport) {
                fs.writeFile(path.join(destination, '/metadata.json'), JSON.stringify(images), 'utf8');
            }

        });

}

module.exports = download;