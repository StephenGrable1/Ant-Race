import React, { Component } from 'react';
import ant from './ant.png';
import './App.css';

import Ant from "./Ant/Ant.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.beginCalculation = this.beginCalculation.bind(this);
    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);
  }

  componentDidMount() {
   fetch("https://antserver-blocjgjbpw.now.sh/graphql?query=%7B%0A%20%20ants%20%7B%0A%20%20%20%20name%0A%20%20%20%20color%0A%20%20%20%20length%0A%20%20%20%20weight%0A%20%20%7D%0A%7D%0A")
      .then(response => response.json())
      .then(response => this.setState(response.data))
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  beginCalculation(){
    console.log("begin calculation");
    var antArray = this.state.ants;
    if(antArray) {
      for(var i = 0; i < antArray.length; i++){
        console.log("This ant is being calculated: ", antArray[i])
        var odds = this.generateAntWinLikelihoodCalculator();
        console.log(odds(function(likelyhood){console.log(likelyhood)}))
      }
    }
  }

  generateAntWinLikelihoodCalculator() {
    var delay = 1000 + Math.random() * 1000;
    var likelihoodOfAntWinning = Math.random();
  
    return function(callback) {
      setTimeout(function() {
        callback(likelihoodOfAntWinning);
      }, 1000);
    };
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
          <div onClick={this.beginCalculation}>Calculate Odds</div>
        {renderAnts()}
        
      </div>
    </div>
    );
  }
}

export default App;