For Maintainers
===============

This document provides information for project maintainers and others
interested in running and modifying the source locally.


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

This installs the dependencies listed in the file [`bower.json`](bower.json)
into a subdirectory called `bower_components`.


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

We maintain a working version of the latest release on the web using
[GitHub Pages][github-pages]: http://cjerdonek.github.io/free-sampler/

This section describes how to update this release.

First, update the version number in
bower.json, package.json, and in the web page footer.

Then, follow the instructions above to build a release.

Copy the contents of the `dist` directory to a clone of the repository
set to the `gh-pages` branch:

    $ cp -r dist/* <path-to-gh-pages-clone>

Inside the clone, commit the changes and push:

    $ git push origin gh-pages

The page should now be ready to view.  Note that GitHub says it can take
up to 10 minutes for changes to appear.


[bower]: http://bower.io/
[git]: http://git-scm.com/
[github-pages]: https://help.github.com/categories/20/articles
[node-js]: http://nodejs.org/
[npm]: https://www.npmjs.org/
