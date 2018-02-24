import React, { Component } from 'react';
import ant from './ant.png';
import './App.css';
import update from 'immutability-helper';


import Ant from "./Ant/Ant.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ants: []
    };

    this.beginCalculation = this.beginCalculation.bind(this);
    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);
    this.waitForResponse = this.waitForResponse.bind(this);
    this.updateState = this.updateState.bind(this);
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
        this.waitForResponse(antArray[i]);
      }
    }
  }

  waitForResponse(ant) {
    this.updateState(ant, 0, "loading..")

    var odds = this.generateAntWinLikelihoodCalculator();
    var promise = new Promise(function(resolve, reject){      

      odds(function(likelyhood){
        resolve(likelyhood)
      })
    })
    
    promise.then((response) => {
      this.updateState(ant, response, "complete")
    });
  }

  updateState(newAnt, likelyhood, status) {
    this.setState(prevState => ({
      ants: [
       {
          ...newAnt,
          likelyhood,
          status
        }
      ]
    }))
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