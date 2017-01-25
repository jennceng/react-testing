import simulateIfPresent from './simulateIfPresent';

let select = (selectionName, optionObject, wrapper) => {
  let selectOption = wrapper.findWhere(n => {
    return n.type() === 'select' && n.props().name === optionObject.from;
  });
  simulateIfPresent(selectOption, 'change', { target: { value: selectionName } });
}

export default select;
