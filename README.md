![Bower version](https://img.shields.io/bower/v/vaadin-upload.svg)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-upload)
[![Build Status](https://travis-ci.org/vaadin/vaadin-upload.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-upload)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/vaadin-core-elements?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


[Live Demo ↗](https://vaadin.com/elements/vaadin-upload/html-examples/upload-basic-demos)

[&lt;vaadin-upload&gt;](https://vaadin.com/elements/vaadin-upload) is a  [Polymer](http://polymer-project.org) element for uploading files, part of the [vaadin-core-elements](https://vaadin.com/elements) element bundle.

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-upload/master/screenshot.png" alt="Screenshot of vaadin-upload" width="723" />](https://vaadin.com/elements/-/element/vaadin-upload)

## Running demos and tests in browser

1. Fork the `vaadin-upload` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-upload` directory, run `npm install` and then `bower install` to install dependencies.

1. Run `polymer serve --open`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:8080/components/vaadin-upload/demo
  - http://127.0.0.1:8080/components/vaadin-upload/test


## Running tests from the command line

1. When in the `vaadin-upload` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `gulp lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Contributing

  - Make sure your code is compliant with our code linters: `gulp lint`
  - Check that tests are passing: `polymer test`
  - [Submit a pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) with detailed title and description
  - Wait for response from one of Vaadin Elements team members


## License

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
