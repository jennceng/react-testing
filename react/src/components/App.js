// import React, { Component }  from 'react';
// import Bar from './Bar';
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chosenBarId: null,
//       bars: []
//     }
//   }
//
//   componentDidMount() {
//     fetch('/api/v1/bars.json')
//       .then((response) => response.json())
//       .then((responseData) => {
//         this.setState({bars: responseData.bars})
//       })
//   }
//
//   render() {
//     let bars = this.state.bars.map(bar => {
//
//       return(
//         <Bar
//           key={bar.id}
//           id={bar.id}
//           name={bar.name}
//           averageRating={bar.average_rating}
//           reviews={bar.reviews}
//         />
//       )
//     })
//     return(
//       <div className="bars">
//         {bars}
//       </div>
//     )
//   }
// }
//
// export default App;
