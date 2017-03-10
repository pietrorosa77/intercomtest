//What is a Closure?
//A closure is the combination of a function bundled together (enclosed) with 
//references to its surrounding state (the lexical environment). 
//In other words, a closure gives you access to an outer function’s scope from an inner function.
//In JavaScript, closures are created every time a function is created, at function creation time.

// More general function.
function add(a, b) {
  return a + b;
}

add(1, 2);  // 3
add(10, 3); // 13

// More specific function generator.
function makeAdder(a) {
  return function(b) {
    return a + b;
  };
}

// More specific functions.
var addOne = makeAdder(1);
addOne(2);  // 3
addOne(3);  // 4

var addTen = makeAdder(10);
addTen(2);  // 12
addTen(3);  // 13

// partialApply(targetFunction: Function, ...fixedArgs: Any[]) =>
//   functionWithFewerParams(...remainingArgs: Any[])
const partialApply = (fn, ...fixedArgs) => {
  return function (...remainingArgs) {
    return fn.apply(this, fixedArgs.concat(remainingArgs));
  };
};


test('add10', assert => {
  const msg = 'partialApply() should partially apply functions'

  const add = (a, b) => a + b;

  const add10 = partialApply(add, 10);


  const actual = add10(5);
  const expected = 15;

  assert.equal(actual, expected, msg);
});

const getSecret = (secret) => {
  return {
    get: () => secret
  };
};

test('Closure for object privacy.', assert => {
  const msg = '.get() should have access to the closure.';
  const expected = 1;
  const obj = getSecret(1);

  const actual = obj.get();

  try {
    assert.ok(secret, 'This throws an error.');
  } catch (e) {
    assert.ok(true, `The secret var is only available
      to privileged methods.`);
  }

  assert.equal(actual, expected, msg);
  assert.end();
});
