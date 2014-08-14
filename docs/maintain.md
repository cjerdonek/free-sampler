For Maintainers
===============

This document provides information for project maintainers.


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


[github-pages]: https://help.github.com/categories/20/articles
