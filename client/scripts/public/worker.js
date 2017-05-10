// worker.js
// =========

// Using a webworker ensures that this code does not have access to the global context

'use strict';


// import { assert } from 'chai';
import * as Challenges from '../../json/challenges.json';

onmessage = e => {


  
  // console.log(Challenges.challenges.map(challenge => challenge.challengeSeed));
  // console.log(e.data);
  
  // const testCases = Challenges.challenges[0].tests;
  // const testCondition = Challenges.challenges[0].tests.map(test => test.match(/^assert\(([^,]*),/)[1]);
  // const testMessage = Challenges.challenges[0].tests.map(test => test.match(/message: (.*)'\);$/)[1]);

  const tests = Challenges.challenges[0].tests.map(test => {
    return {
      test: test,
      testCondition: test.match(/^assert\(([^,]*),/)[1],
      testMessage: test.match(/message: (.*)'\);$/)[1] 
    }
  });

  // Solution #1: Append 'return' and construct a new Function, then call that function.
  const reFn = e.data.replace(Challenges.challenges[0].challengeSeed[0],
    'return ' + Challenges.challenges[0].challengeSeed[0]);

  const userFn = (new Function(reFn))();
  console.log(userFn('test string'));

  // single test case:
  const testCase = assert + '\n' + e.data + '\n' + 'return ' + tests[0].test;
  const tc = (new Function(testCase))();
  console.log('assert!: ' + tc);

  // multiple test cases in one:
  const reTestCases = tests.map(test => 
    `${assert};
    ${e.data};
   // console.log(${test.testCondition} ${test.testMessage});
    return ${test.test}`);

  const assertFns = reTestCases.map(reTestCase => (new Function(reTestCase))());
  // console.log('assert: ' + assertFns);
  assertFns.map(assertFn => console.log('assert! ' + assertFn));

  // Solution: #2: Append the test case to the end the code below (since the last evaluation is returned)

  // console.log('eval: ' + eval(testCase));

  // const testACase = eval((function () { return testCase; })());

  // console.log('test: ' + testACase);


  const userCode = eval((function () { return e.data; })());
  console.log(userCode); // this is the return for the user console box.
  
};

// postMessage(runTestsAgainstUserCode());
// onmessage = e => { console.log(e); };


function assert (condition, message) {
  if (!condition) {
    /*
    message = message || 'Assertion failed';
    if (typeof Error !== 'undefined') {
      throw new Error(message);
    }
    throw message;
    */
    return false;
  }
  return true;
}

