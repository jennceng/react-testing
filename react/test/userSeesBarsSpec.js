import App from '../src/components/App';

describe('Bars Index', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(
      createResponseFromFixture('bars/barsIndex')
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('visiting the bars homepage', () => {
    beforeEach(() => {
      wrapper = mount(
        <App />
      );
    });

    it('has the bars and their average ratings and no reviews', done => {
      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toMatch('Drink');
        expect(pageText).toMatch('Charlie\'s Kitchen');
        expect(pageText).toMatch('4.666666666666667');
        expect(pageText).not.toMatch('kombucha viral');

        done();
      },0)
    });
  });

  describe('selects a bar to toggle reviews', () => {
    beforeEach(() => {
      wrapper = mount(
        <App />
      );
    });

    it('shows a reviews of that bar if user clicks on it', done => {
      setTimeout(() => {
        let drink = wrapper.findWhere(n => {
          return n.text() === 'Drink';
        });
        simulateIfPresent(drink, 'click');
      }, 0);

      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toMatch("Etsy cliche disrupt goth kombucha viral cold-pressed normcore.");
        expect(pageText).toMatch("Irony sriracha gastropub intelligentsia shoreditch.");
        expect(pageText).toMatch("Wes anderson raw denim listicle waistcoat biodiesel tacos.");

        expect(pageText).not.toMatch("Hashtag blog iphone direct trade xoxo kogi retro.");
      }, 0);

      setTimeout(() => {
        let drink = wrapper.findWhere(n => {
          return n.text() === 'Drink';
        });
        simulateIfPresent(drink, 'click');
      }, 0);

      setTimeout(() => {
        let pageText = wrapper.text();

        expect(pageText).not.toMatch("Etsy cliche disrupt goth kombucha viral cold-pressed normcore.");
        expect(pageText).not.toMatch("Irony sriracha gastropub intelligentsia shoreditch.");
        expect(pageText).not.toMatch("Wes anderson raw denim listicle waistcoat biodiesel tacos.");

        expect(pageText).not.toMatch("Hashtag blog iphone direct trade xoxo kogi retro.");
        done();
      }, 0);
    });

  });

});
