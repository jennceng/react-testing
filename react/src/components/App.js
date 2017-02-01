import React, { Component }  from 'react';
import Bar from './Bar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBarId: null,
      inFocusReview: {},
      bars: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

  handleClick(id) {
    if (this.state.chosenBarId === id) {
      this.setState({ chosenBarId: null})
    } else {
      this.setState({ chosenBarId: id });
    }
  }

  handleReviewClick(id) {
    fetch(`/api/v1/reviews/${id}/edit`)
      .then((response) => response.json())
      .then((responseData => {
        this.setState({inFocusReview: responseData})
      }))
  }

  componentDidMount() {
    debugger;
    fetch('/api/v1/bars.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({bars: responseData.bars})
      })
  }

  render() {
    let bars = this.state.bars.map(bar => {
      let active;
      let reviews;
      let onClick = () => this.handleClick(bar.id);

      if(this.state.chosenBarId === bar.id) {
        active = true;
      }

      return(
        <Bar
          key={bar.id}
          id={bar.id}
          active={active}
          name={bar.name}
          averageRating={bar.average_rating}
          reviews={bar.reviews}
          url={bar.url}
          onClick={onClick}
          inFocusReview={this.state.inFocusReview}
          onReviewClick={this.handleReviewClick}
        />
      )
    })
    return(
      <div className="bars">
        <h1 className="page-title"> Bars </h1>
        {bars}
      </div>
    )
  }
}

export default App;
