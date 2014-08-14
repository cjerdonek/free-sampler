FreeSampler
===========

[The first version of this project is still under development.]

This repository contains a web application for randomly selecting items
from a collection.

Go [here][free-sampler-app] to try out the latest version.


Background
----------

For example, the application can be used for things like selecting
precincts at random after an election for a manual audit.

The application is an implementation of Ronald L. Rivest's SHA-256
[sampling algorithm][rivest-sampler].

TODO: mention that you supply a seed.

This implementation uses AngularJS and has both unit tests and end-to-end
tests.  The project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.

This application has unit tests and is also tested against the publicly
available test cases [`rivest-sampler-tests`][sampler-tests].


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
developed by [Philip B. Stark][stark-impl].


[free-sampler-app]: http://cjerdonek.github.io/free-sampler/
[maintain]: docs/maintain.md
[philip-stark]: http://www.stat.berkeley.edu/~stark/
[rivest-sampler]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
