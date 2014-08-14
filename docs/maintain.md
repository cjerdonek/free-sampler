For Maintainers
===============

This document provides information for project maintainers.


Building
--------

To build a release, run the following command from the repository root:

    $ grunt build

To test a release locally, run the following:

    $ grunt serve:dist

This runs `grunt build` prior to serving the files.


Releasing
---------

When releasing a new version, update the version number in
bower.json, package.json, and in the web page footer.
