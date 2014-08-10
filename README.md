FreeSampler
===========

[This project is not yet complete.]

A browser implementation of Ronald Rivest's elegant
[sampling algorithm][rivest-sampler], which can be used for selecting
precincts at random for a post-election manual audit.

This implementation uses AngularJS and has both unit tests and end-to-end
tests.  The project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.
See also [`rivest-sampler-tests`][sampler-tests] for test cases.

See Philip B. Stark's [implementation][stark-impl] for another browser
implementation.


[rivest-sampler]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm