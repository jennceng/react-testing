import simulateIfPresent from './simulateIfPresent';

let clickButton = (buttonText, wrapper) => {
  let button = wrapper.findWhere(n => {
    return n.type() === 'button' && n.text() === buttonText;
  });
  simulateIfPresent(button, 'click', { button: 0 });
}

export default clickButton;
