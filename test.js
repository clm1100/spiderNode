const makeDir = require('make-dir');

makeDir('test').then(path => {
    console.log(path);
    //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake'
});