import simulateIfPresent from './simulateIfPresent';

let fillIn = (fieldText, valueObject, wrapper) => {
  let formField = wrapper.findWhere(n => {
    return n.type() === 'input' && n.props().name === fieldText;
  });
  simulateIfPresent(formField, 'change', { target: { value: valueObject.with } });
}

export default fillIn;
