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
  }

  handleClick(id) {
    if (this.state.chosenBarId === id) {
      this.setState({ chosenBarId: null})
    } else {
      this.setState({ chosenBarId: id });
    }
  }

  componentDidMount() {
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
        />
      )
    })
    return(
      <div className="bars">
        {bars}
      </div>
    )
  }
}

export default App;
