let simulateIfPresent = (wrapper, ...args) => {
  wrapper.isEmpty() ? expect(wrapper).toBePresent() : wrapper.simulate(...args);
};

export default simulateIfPresent;
