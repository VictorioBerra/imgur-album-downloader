# Imgur API Album Downloader

Driven by Imgur API.

## Installation

`npm i iad -g`
or run right away without installing `npx imgur-album-downloader -- --help`

## Usage

You need a ClientID. Login to Imgur, go [here][register-client] and select "Anonymous usage" and complete the registration to obtain a key.

```text
iad <clientid> <id> [dest]

download an album

Positionals:
  clientid  the client id you got after registering with Imgur, see README for
            more information                                            [string]
  id        id of Imgur album                                           [string]
  dest      destination directory to save files to
                        [string] [default: "your pwd"]

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --loglevel, -l  Level of logging 0 to 2                           [default: 1]
  --report, -r    Create a JSON metadata report of files and file data.
                                                      [boolean] [default: false]
```

## todo (nice to haves)

- Zip files

## License

MIT

[register-client]: https://api.imgur.com/oauth2/addclient