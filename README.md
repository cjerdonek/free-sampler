FreeSampler
===========

[![Build Status](https://travis-ci.org/cjerdonek/free-sampler.svg?branch=master)](https://travis-ci.org/cjerdonek/free-sampler)

[The first version of this project is still under development.]

This repository contains an open source web application that lets you
run the [SHA-256][sha-256] pseudo-random sampling algorithm described
in 2011 by [Ronald L. Rivest][rivest].

The application can be used for things like selecting precincts at
random for a post-election manual audit.

To try out the latest version, go [here][free-sampler-app].

For bug reports and feature requests, visit the [issue tracker][issue-tracker].


About the Algorithm
-------------------

TODO: mention that you supply a seed.

The [reference implementation][rivest-impl] of the algorithm (written in
Python), along with a description, can be found on Rivest's web site.


About the Application
---------------------

TODO: move some of this to maintainers.

This implementation uses AngularJS and has both unit tests and end-to-end
tests.  The project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.

It is also tested against the publicly available test cases
[`rivest-sampler-tests`][sampler-tests].


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


[free-sampler-app]: http://cjerdonek.github.io/free-sampler/
[issue-tracker]: https://github.com/cjerdonek/free-sampler/issues
[maintain]: docs/maintain.md
[rivest]: http://people.csail.mit.edu/rivest/
[rivest-impl]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[sha-256]: http://en.wikipedia.org/wiki/SHA-2
[stark]: http://www.stat.berkeley.edu/~stark/
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
