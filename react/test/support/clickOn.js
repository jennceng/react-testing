import simulateIfPresent from './simulateIfPresent';

let clickOn = (clickTarget, wrapper) => {
  simulateIfPresent(wrapper.find(clickTarget), 'click');
}

export default clickOn;
