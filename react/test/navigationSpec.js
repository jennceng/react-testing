import Root from 'components/Root';

describe('navigate from the dashboard', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(
      createResponseFromFixture('bars/barsIndex')
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('from the dashboard page', () => {
    beforeEach(() => {
      browserHistory.push('/');
      wrapper = mount(
        <Root routes={routes} browserHistory={browserHistory} />
      );
    });

    it('can navigate to the home page', done => {
      setTimeout(() => {
        let pageText = wrapper.text();
        console.log(pageText)
        expect(pageText).toMatch('I am the Bars Index Container')
        expect(pageText).toMatch('Suds')
        expect(pageText).toMatch('10 bucks after 10pm')
        done();
      }, 0)
    });

  });
});
