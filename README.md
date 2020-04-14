# Hacker News Boilerplate App
Universal boilerplate app using react and redux

[![CircleCI](https://circleci.com/gh/nirbhaymandelia/hacker-news-clone.svg?style=svg)](https://circleci.com/gh/nirbhaymandelia/hacker-news-clone)

## About

This is a starter boilerplate app I've put together using the following technologies:

* [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering with code-splitting.
* Caching - custom framework implementation to cache pre-required server side data call with option to specify caching duration in routes to boost performance.
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Postcss](https://github.com/postcss/postcss) As css pre-processor
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Toolkit](https://redux-toolkit.js.org/) next generation toolset for efficient Redux development
* [ESLint](http://eslint.org) to maintain a consistent code style
* [Stylelint](https://stylelint.io/) to maintain a consistent css code style
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client

## Installation

```bash
yarn install
```

## Running Dev Server

```bash
yarn run start
```

## Building Code for Production

```bash
yarn run build
```

## Starting Production Server

```bash
yarn run serve
```

## Run Linting

```bash
yarn run lint
```
