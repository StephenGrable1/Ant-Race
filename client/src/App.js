import React, { Component } from 'react';
import ant from './ant.png';
import './App.css';

import Ant from "./Ant/Ant.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
   fetch("https://antserver-blocjgjbpw.now.sh/graphql?query=%7B%0A%20%20ants%20%7B%0A%20%20%20%20name%0A%20%20%20%20color%0A%20%20%20%20length%0A%20%20%20%20weight%0A%20%20%7D%0A%7D%0A")
      .then(response => response.json())
      .then(response => this.setState(response.data))
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    var renderAnts = () => {
      var antArray = this.state.ants;
      if(antArray){
        return antArray.map((ant) => <Ant key={ant.name} {...ant}/>)
      }
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={ant} className="App-logo" alt="ant" />
          <h1 className="App-title">Ant Race</h1>
        </div>
        <div>
        {renderAnts()}
        
      </div>
    </div>
    );
  }
}

export default App;