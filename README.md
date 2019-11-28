# Sirdata contextual Typescript Library


# What is Sirdata Contextual?
#### Sirdata - Classify web content

Sirdata’s powerful API lets you quickly and seamlessly classify web page

# Table of contents

- [Install](#install)
- [Getting Started](#getting-started)
- [Documentation](#api-documentation)
- [Demo app](#demo-app) 
- [Docker](#compile)
- [Contributions](#contributions)

# Install

```
npm install sirdata-contextual-ts-client
```


## Getting Started

TODO

## API Documentation

TODO

# Demo app

TODO

## Compile

Use docker to compile project

````
docker run -v $PWD:/mnt -it --entrypoint /bin/sh node:10-alpine
````

Get node modules

```
cd /mnt && npm install
```


```
#compile ts files
cd /mnt && npm run build

# exec tests
npm run test 
    OR
cd /mnt && ./node_modules/.bin/jest test

```

# Contributions

All contributions are welcomed
