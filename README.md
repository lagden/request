# Request

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]: https://img.shields.io/npm/v/@tadashi/request.svg
[npm]: https://www.npmjs.com/package/@tadashi/request
[ci-img]: https://github.com/lagden/request/actions/workflows/nodejs.yml/badge.svg
[ci]: https://github.com/lagden/request/actions/workflows/nodejs.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/request/badge.svg?branch=main
[coveralls]: https://coveralls.io/github/lagden/request?branch=main

---

Request library.

## Install

```
$ npm i @tadashi/request
```

## Usage

```js
import request from '@tadashi/request'

const obj = await request('https://registry.npmjs.org/@tadashi/request/latest')
// obj.name => '@tadashi/request'
```

## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Lagden" width="90">](https://github.com/lagden)

## Donate ❤️

- BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4

## License

MIT © [Thiago Lagden](https://github.com/lagden)
