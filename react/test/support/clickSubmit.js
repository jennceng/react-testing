import simulateIfPresent from './simulateIfPresent';

let clickSubmit = (buttonText, wrapper) => {
  let submitButton = wrapper.findWhere(n => {
    return n.type() === 'button' && n.text() === buttonText;
  });
  simulateIfPresent(submitButton, 'submit');
}

export default clickSubmit;
