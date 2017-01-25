import { shallow, mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import createResponseFromFixture from './support/createResponseFromFixture';
import createNoContentResponse from './support/createNoContentResponse';
import simulateIfPresent from './support/simulateIfPresent';
import fillIn            from './support/fillIn';
import clickSubmit       from './support/clickSubmit';
import clickButton       from './support/clickButton';
import select            from './support/select';
import clickOn           from './support/clickOn';

Object.assign(global, {
  createNoContentResponse,
  createResponseFromFixture,
  jasmineEnzyme,
  mount,
  React,
  shallow,
  simulateIfPresent,
  fillIn,
  clickSubmit,
  clickButton,
  select,
  clickOn
});

beforeEach(() => {
  jasmineEnzyme();
});

afterEach(() => {
  if(global.page) { global.page.unmount(); }
});

// require all js files that end with Spec.js or Spec.jsx in the test folder
var testsContext = require.context(".", true, /Spec.jsx?$/);
testsContext.keys().forEach(testsContext);

// output to the browser's console when the tests run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);
