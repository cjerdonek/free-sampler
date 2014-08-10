FreeSampler
===========

[This project is not yet functional.]

This repository contains a browser application for selecting items
at random from a collection given a random seed.  For example, the
application can be used for things like selecting precincts at random
for a post-election manual audit, after generating a random seed in public.

The application is an implementation of Ronald L. Rivest's SHA-256
[sampling algorithm][rivest-sampler].

This implementation uses AngularJS and has both unit tests and end-to-end
tests.  The project was started using version 0.9.5 of
[`generator-angular`](https://github.com/yeoman/generator-angular),
the Yeoman generator for AngularJS.
See [`rivest-sampler-tests`][sampler-tests] for test cases that help
confirm the correctness of this implementation.

See also Philip B. Stark's [implementation][stark-impl] for another browser
implementation.


[rivest-sampler]: http://people.csail.mit.edu/rivest/sampler.py
[sampler-tests]: https://github.com/cjerdonek/rivest-sampler-tests
[stark-impl]: http://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
