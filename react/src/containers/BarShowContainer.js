import React, { Component }  from 'react';
import BarShow from '../components/BarShow';

class BarShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviews: []
      }
    }
  }

  componentDidMount() {
    let barId = this.props.params.id;
    fetch(`/api/v1/bars/${barId}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({data: responseData.bar})
      })
  }
  render() {
    return(
      <div className="bars">
      <h3> I am the show container! </h3>
        <BarShow
          key={this.state.data.id}
          id={this.state.data.id}
          name={this.state.data.name}
          averageRating={this.state.data.average_rating}
          reviews={this.state.data.reviews}
        />
      </div>
    )
  }
}

export default BarShowContainer;
