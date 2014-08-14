FreeSampler
===========

[This project is not yet functional.]

This repository contains a web application for randomly selecting items
from a collection.

For example, the application can be used for things like selecting
precincts at random after an election for a manual audit.

The application is an implementation of Ronald L. Rivest's SHA-256
[sampling algorithm][rivest-sampler].

TODO: mention that you supply a seed.

This implementation uses AngularJS and has both unit tests and end-to-end
tests.  The project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.
See [`rivest-sampler-tests`][sampler-tests] for test cases that help
confirm the correctness of this implementation.

See also Philip B. Stark's [implementation][stark-impl] for another browser
implementation.


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


[maintain]: docs/maintain.md
[rivest-sampler]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
