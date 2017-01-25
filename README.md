Background
----------

* Back in the good ol’ days, testing javascript was fairly straightforward if you were using simple javascript (vanilla, jQuery, maybe even a little ajax) and not huge frameworks, by using something like capybara-webkit and enabling js

  * this allowed us to have a “full-stack” test, tests that were pinging our controllers / databases, clicking around and firing off javascript, and making expectations and assertions

* You’ve seen some testing of components in React, which are essentially tests for your classes and functions to make sure they’re working as expected. That’s cool.. but what about React feature tests?
* Nowadays with huge JavaScript frameworks like React, testing can feel a little more like a headache. Full-stack tests are hard to enact now… so..

![](http://i.imgur.com/vRg1smI.gif)

---

Just kidding.

---

Ask yourself: what am I trying to test?
---------------------------------------

* what will make me confident that my code is working?
* what will help me sleep at night?
* what will make me feel like if someone screws up the codebase the tests will catch it (\*cough\* Mike \*cough\*)
* how can I test my React when it’s become too complex to test full-stack

### Well… why do I want to test full stack?

* to make sure my back end and front end are both working together
* Okay… so how about I test the back end AND test the front end?

### What a dope idea.

* If I have tests covering my back-end, I can rest assured that my back end is working as expected
* Since my back-end tests are passing, I can test my front end with the assumption that my back end is working, and simply mock out any calls to my back end

---

### But how?

Let’s start with a simple example of a back-end rails app and a front-end react app working together. Let’s say you have a lifecycle method in your React app that fetches JSON data from your back-end. How should we divide the tests?

* **back-end rails test**: test the controller that deals with your fetch call’s request and make sure the JSONified response is what you’d expect
* **react test**: stub out your fetch call to hard-coded JSON data in the same format as it’s returned in your controller

---

I have a simple app called bar reviews, let’s fire it up and poke around.



```js
// react/components/App.js
class App extends Component {
  ...
  componentDidMount() {
    fetch('/api/v1/bars.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({bars: responseData.bars})
      })
  }
  ...
}
```

This fetch call is handled by `Api::V1::BarsController`, you can tell by the `routes.rb` and running `rake routes`

```ruby
# controllers/api/v1/bars_controller.rb
class Api::V1::BarsController < ApplicationController
  def index
    @bars = Bar.all
    render json: @bars
    # fyi the above automatically uses my bar_serializer
  end
end
```

Let’s boot up the rails server to visit [http://localhost:3000/api/v1/bars](http://localhost:3000/api/v1/bars) and take a look at the expected response. Sweet.

What is this test trying to accomplish? It is making sure that given the fake bars and reviews, the JSON response is as expected. In order to have something to test against for react, I put a binding.pry in the test and copied the json into a barIndex.json file in react. You can also simply copy and paste from the development endpoint too. Whatevs.

```ruby
# api/v1/bars_controller_spec.rb
require "rails_helper"

RSpec.describe Api::V1::BarsController, type: :controller do
  describe "GET #index" do
    let(:drink) { Bar.create(name: "Drink", address: "348 Congress St", hours_of_operation: "4PM-1AM", cover_charge: "none") }
    let(:charlies) { Bar.create(name: "Charlie's Kitchen", address: "10 Eliot St", hours_of_operation: "11AM-1AM") }

    let!(:drink_review_1) { Review.create(bar: drink, rating: 5, body: Faker::Hipster.paragraph(2)) }
    let!(:drink_review_2)  { Review.create(bar: drink, rating: 4, body: Faker::Hipster.paragraph(2)) }
    let!(:drink_review_3)  { Review.create(bar: drink, rating: 5, body: Faker::Hipster.paragraph(2)) }
    let!(:charlies_review_1) { Review.create(bar: charlies, rating: 5, body: Faker::Hipster.paragraph(2)) }

    it "should return all bars and their associated reviews" do
      get :index
      json = JSON.parse(response.body)

      expect(json["bars"].length).to eq(2)
      expect(json["bars"][0]["name"]).to eq("Drink")
      expect(json["bars"][1]["name"]).to eq("Charlie's Kitchen")

      expect(json["bars"][0]["reviews"].length).to eq(3)
      expect(json["bars"][1]["reviews"].length).to eq(1)

      expect(json["bars"][1]["reviews"][0]["id"]).to eq(charlies_review_1.id)
      expect(json["bars"][1]["reviews"][0]["rating"]).to eq(5)
      expect(json["bars"][1]["reviews"][0]["body"]).to eq(charlies_review_1.body)
    end
  end
end
```

---

Enter React land and our front end testing

```json
# react/test/fixtures/bars/barsIndex.json
{"bars":
  [{"id":41,
    "name":"Drink",
    "url":"http://localhost:3000/bars/41",
    "average_rating":4.666666666666667,
    "editable":false,
    "reviews":
     [{"id":77,
       "bar_id":41,
       "rating":5,
       "body":
        "Flexitarian deep v direct trade lo-fi. Etsy cliche disrupt goth kombucha viral cold-pressed normcore. Whatever etsy occupy cronut. Marfa direct trade green juice brunch put a bird on it keffiyeh organic +1.",
       "created_at":"2017-01-25T15:41:36.718Z",
       "updated_at":"2017-01-25T15:41:36.718Z"},
      {"id":78,
       "bar_id":41,
       "rating":4,
       "body":
        "Keffiyeh franzen wayfarers church-key pork belly pop-up meggings listicle. Irony sriracha gastropub intelligentsia shoreditch. Brunch cray street narwhal normcore.",
       "created_at":"2017-01-25T15:41:36.721Z",
       "updated_at":"2017-01-25T15:41:36.721Z"},
      {"id":79,
       "bar_id":41,
       "rating":5,
       "body":
        "Wes anderson raw denim listicle waistcoat biodiesel tacos. Pinterest schlitz etsy tousled brooklyn venmo. Fanny pack migas you probably haven't heard of them portland retro pour-over schlitz.",
       "created_at":"2017-01-25T15:41:36.724Z",
       "updated_at":"2017-01-25T15:41:36.724Z"}]},
   {"id":42,
    "name":"Charlie's Kitchen",
    "url":"http://localhost:3000/bars/42",
    "average_rating":5.0,
    "editable":false,
    "reviews":
     [{"id":80,
       "bar_id":42,
       "rating":5,
       "body":
        "Hashtag blog iphone direct trade xoxo kogi retro. Jean shorts tousled tilde franzen beard migas you probably haven't heard of them lumbersexual.",
       "created_at":"2017-01-25T15:41:36.728Z",
       "updated_at":"2017-01-25T15:41:36.728Z"}]}]
}
```

What do I want to test?

* I want to be sure that when a user lands on the index page, they see the list of bars but no reviews
* If a user clicks a bar, the reviews for that bar show up, and reviews for another bar do not
* If a user clicks that same bar again, the reviews should disappear

**ProTip: **Many of our application interactions are asynchronous, for when first visiting the page a fetch is enacted. By using a setTimeout, we can ensure that events happen in certain sequences, we don’t want to make assertions on how the website should look until the promise of the fetch is resolved! Likewise, when pressing a button, we want to make sure whatever state changes happen before making expectations. With setTimeout, we can be the master of the sequence in which code is executed.

debugger can be very finicky in tests, I often just console.log the pages contents when I am first writing up my tests, sort of a cheap save\_and\_open\_page to see text.

```js
// userSeesBarsSpec.js

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
        // console.log(pageText)
        expect(pageText).not.toMatch("Etsy cliche disrupt goth kombucha viral cold-pressed normcore.");
        expect(pageText).not.toMatch("Irony sriracha gastropub intelligentsia shoreditch.");
        expect(pageText).not.toMatch("Wes anderson raw denim listicle waistcoat biodiesel tacos.");

        expect(pageText).not.toMatch("Hashtag blog iphone direct trade xoxo kogi retro.");
        done();
      }, 0);
    });

  });

});

```

---

Side note: I realize that testing React looks a little gross, especially since we’re used to capybara.  Don’t forget rails is a fairly mature stack, whereas React is only starting to get settled in.  New testing helpers are popping up all the time now with React, in fact a former EE here who developed Launch’s React Curriculum is making a cleaner looking test library for React that makes it look more like capybara.  I’m hoping he calls it Wombat.
