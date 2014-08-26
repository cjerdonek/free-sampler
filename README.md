Quick Sampler
=============

[![Build Status](https://travis-ci.org/cjerdonek/quick-sampler.svg?branch=master)](https://travis-ci.org/cjerdonek/quick-sampler)

This repository contains an open source web application called
"Quick Sampler" that lets one run the [SHA-256][sha-256] pseudo-random
sampling algorithm described by [Ronald L. Rivest][rivest] in 2011.

Quick Sampler can be used for things like selecting precincts at
random for a post-election manual audit given a random seed supplied
by the user.

To try out the latest version, go [here][quick-sampler-app].  For bug
reports and feature requests, visit the [issue tracker][issue-tracker].


Application Features
--------------------

The application features a user interface designed with
[Bootstrap][bootstrap] and [AngularJS][angularjs].

The application uses only client-side Javascript (i.e. there is no
server-side logic), so the application can be deployed using only static
HTML, etc.  Guidance for installing locally can be found in
[this section](#installing-locally) of this document.

The application is tested with automated unit tests and end-to-end
browser tests.  The mathematical operations are tested against the test
cases in the publicly available [`rivest-sampler-tests`][sampler-tests]
repository.  Tests are also set up to run automatically using
[Travis CI][travis-ci].


About the Algorithm
-------------------

The Rivest sampling algorithm provides a convenient way to choose items
from a collection at random given a random seed supplied by the user.

The random seed can be any string of characters (e.g. letters and numbers).
For example, the random seed can be a string of digits generated by
rolling dice several times.

The reference implementation of the algorithm (written in Python), along
with a description, can be found [here][rivest-impl] on Rivest's web site.


### Algorithm Description

Here is a technical illustration of the algorithm.

Say you would like to choose from a collection of 1000 items given
the random seed `01234567890123456789`.  To choose the first item,
consider the

TODO


Installing Locally
------------------

TODO


Development
-----------

See the [Maintainers][maintain] page for information on maintaining
and releasing this project.


License
-------

This project is licensed under the BSD 3-clause license.  See the
[`LICENSE`](LICENSE) file for details.


Author
------

Chris Jerdonek (<chris.jerdonek@gmail.com>)


Acknowledgments
---------------

This project was inspired by the browser implementation [here][stark-impl]
developed by [Philip B. Stark][stark].


[angularjs]: https://angularjs.org/
[bootstrap]: http://getbootstrap.com/
[issue-tracker]: https://github.com/cjerdonek/quick-sampler/issues
[maintain]: docs/maintain.md
[quick-sampler-app]: http://cjerdonek.github.io/quick-sampler/
[rivest]: http://people.csail.mit.edu/rivest/
[rivest-impl]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[sha-256]: http://en.wikipedia.org/wiki/SHA-2
[stark]: http://www.stat.berkeley.edu/~stark/
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
[travis-ci]: https://travis-ci.org/
