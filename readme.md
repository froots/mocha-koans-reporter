mocha-koans-reporter
====================

A reporter for [mocha](http://visionmedia.github.com/mocha/) to simplify the creation of JavaScript koans.

Heavily inspired by and modelled on the [New Context Ruby Koans](http://rubykoans.com/).

Pre-requisities
---------------

* [Node.js](http://nodejs.org/)
* [NPM](https://npmjs.org/)

Install
-------

    npm install -g mocha-koans-reporter

Usage
-----

Run with a suite of mocha tests:

    mocha -R mocha-koans-reporter -b [test-directory]

It is important to use the `-b` flag to bail on the first failure, as is the style for koans.