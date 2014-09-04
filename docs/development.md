Development
===========

This document contains development information about Quick Sampler.
For example, it includes information about how to build a release
and run and test the source code locally.  It also includes information
for project maintainers like how to release a new version.


Project Background
------------------

This project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.

For needed math functions, it depends on the following Javascript libraries,
which are imported via Bower:

* [jsSHA](https://github.com/Caligatio/jsSHA) by Brian Turek for a
  Javascript implementation of SHA-256, and
* [BigInt](https://github.com/Evgenus/BigInt), a thin wrapper around
  a Javascript library by Baird Leemon for high-precision integer arithmetic.


Getting Started
---------------

To develop locally, you will need to download and install [Node.js][node-js].
This will also install Node's package manager [`npm`][npm].

After cloning the repository using [Git][git], run the following from the
repository root--

    $ npm install

This installs the dependencies listed in the file
[`package.json`](package.json) into a subdirectory called `node_modules`.

You will also need to install [Bower][bower], which is a command-line
utility for web application javascript dependencies:

    $ npm install -g bower

Then run the following from the repository root--

    $ bower install

This installs the dependencies listed in the file
[`bower.json`](../bower.json) into a subdirectory called `bower_components`.


Testing
-------

To run unit tests, run the following from the repository root--

    $ grunt test


Running
-------

To run the source code locally from a browser:

    $ grunt serve


Building
--------

To build a release, run the following command from the repository root:

    $ grunt build

This creates the build in a subdirectory called `dist`.

To test a release locally in a browser, run the following:

    $ grunt serve:dist

This runs `grunt build` prior to serving the files.


Releasing
---------

This section describes all of the steps to release a new version
of Quick Sampler.


### 1. Commit and tag the release

Update the version number in [`package.json`](../package.json#L3)
and in the footer of the application home page
[`index.html`](../app/index.html#L36).  Also

Make sure

Second, build a release following the instructions in the
[Building](#building) section above:

    $ grunt build


### Update the GitHub pages version

We maintain a working version of the latest release on the web using
[GitHub Pages][github-pages]: http://cjerdonek.github.io/quick-sampler/

Copy the contents of the `dist` directory to a clone of the repository
set to the `gh-pages` branch:

    $ cp -r dist/* <path-to-gh-pages-clone>

Inside the clone, commit the changes and push:

    $ git push origin gh-pages

The page should now be ready to view.  Note that GitHub says it can take
up to 10 minutes for changes to appear.


### Create a pre-built release


Then:

    $ tar -czf quick-sampler.tar.gz dist/


Also tag the repo version as follows, for example:

    $ git tag v0.2.0
    $ git push origin v0.2.0


[bower]: http://bower.io/
[git]: http://git-scm.com/
[github-pages]: https://help.github.com/categories/20/articles
[node-js]: http://nodejs.org/
[npm]: https://www.npmjs.org/
