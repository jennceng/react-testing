import React, { Component }  from 'react';
import BarTile from '../components/BarTile';

class BarsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/bars.json')
      .then((response) => response.json()).then((d) => {debugger;})
      .then((responseData) => {
        this.setState({bars: responseData})
      })
  }

  render() {
    let bars = this.state.bars.map(bar => {
      return(
        <BarTile
          key={bar.id}
          id={bar.id}
          name={bar.name}
          address={bar.address}
          hours_of_operation={bar.hours_of_operation}
        />
      )
    })
    return(
      <div className="bars">
        <h2> I am the Bars Index Container </h2>
        {bars}
      </div>
    )
  }
}

export default BarsIndexContainer;