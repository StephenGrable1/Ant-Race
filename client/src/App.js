import React, { Component } from 'react';
import ant from './ant.png';
import './App.css';

import antFilter from "./antFilter.js";
import likelyhoodGenerator from './likelyhoodCalculator.js'
import Ant from "./Ant/Ant.js"

class App extends Component {
  // If this app got any bigger I would probably integrate redux. Changing the state would become 
  // more streamlined than what is displayed below. Components would then be simplified dramatically. 
  constructor(props){
    super(props);
    this.state = {
      ants: [],
      loadingStatus: "Not yet run"
    };

    this.beginCalculation = this.beginCalculation.bind(this);
    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);
    this.waitForResponse = this.waitForResponse.bind(this);

    this.intialLoading = this.intialLoading.bind(this);
    this.updateSingleAntState = this.updateSingleAntState.bind(this);
    this.areAllAntsCompleted = this.areAllAntsCompleted.bind(this);

  }

  componentDidMount() {
   fetch("https://antserver-blocjgjbpw.now.sh/graphql?query=%7B%0A%20%20ants%20%7B%0A%20%20%20%20name%0A%20%20%20%20color%0A%20%20%20%20length%0A%20%20%20%20weight%0A%20%20%7D%0A%7D%0A")
      .then(response => response.json())
      .then(response => {
        //get data from endpoint and directly push into our state
        this.setState(response.data)
        var antArray = this.state.ants;
        //then loop over this entire state and set additional app data onto each item
        for(var i = 0; i < antArray.length; i++){
          this.updateSingleAntState(antArray[i], 0, "Not yet run")
        }
      })
  }

  intialLoading(){
    //this is where I believe redux pure functions could be used to simplify the state changing mechanism. 
    //Here I rebuild the state by created a copy and providing the app with an entirely new state array (full of ant objects)
    var stateCopy = Object.assign({}, this.state);
    stateCopy.ants = stateCopy.ants.slice();

    for(var i = 0; i < stateCopy.ants.length; i++){
        stateCopy.ants[i] = Object.assign({}, stateCopy.ants[i]);
        stateCopy.ants[i].status = "loading...";
        stateCopy.ants[i].likelyhood = 0;
        this.setState(stateCopy);
      } 
      this.setState({loadingStatus: "loading..."})
      this.beginCalculation();
  }
  
  beginCalculation(){
    //this begins the calculation process and calls a function that will wait 
    //for the data to be calculated 
    var antArray = this.state.ants;
    if(antArray.length > 0) {
      for(var i = 0; i < antArray.length; i++){
        this.waitForResponse(antArray[i]);
      }
    }
  }

  generateAntWinLikelihoodCalculator(){
    return likelyhoodGenerator()
  }

  waitForResponse(antItem) {
    //this function will call the likelyhood generator and wait for a response
    var odds = this.generateAntWinLikelihoodCalculator();
    var promise = new Promise(function(resolve, reject){      
      odds(function(likelyhood){
        resolve(likelyhood)
      })
    })
    //once the response comes back we take that value and update the 
    //ant object in the state 
    promise.then((response) => {
      this.updateSingleAntState(antItem, response, "complete")
    });
  }

  updateSingleAntState(newAnt, likelyhood, status) {
    //this function updates a single ant inside of the state. 
    //we copy the state and provide react with a completely rebuild new state
    var stateCopy = Object.assign({}, this.state);
    stateCopy.ants = stateCopy.ants.slice();

    for(var i = 0; i < stateCopy.ants.length; i++){
      if(stateCopy.ants[i].name === newAnt.name){
        stateCopy.ants[i] = Object.assign({}, stateCopy.ants[i]);
        stateCopy.ants[i].status = status;
        stateCopy.ants[i].likelyhood = likelyhood;
        this.setState(stateCopy);
      } 
    }
    //after each ant is updated, we want to check to see if all 
    //ants are completed so we can update the global ui
    this.areAllAntsCompleted() 
  }

  areAllAntsCompleted(){
    var antsArray = this.state.ants;
    var howManyCompleted = 0;
    //loop over the state to count how many ants have been completed
    //if the value is equal to the array length, we know that all ants 
    //are complete and we can update the state and tell the user that all
    //the values have been calculated
    for(var i = 0; i < antsArray.length; i++){
      if(antsArray[i].status === 'complete'){
        howManyCompleted = howManyCompleted + 1;
      }
    }

    if(howManyCompleted === antsArray.length){
      this.setState({loadingStatus: "completed"})
    }
  }
 
  render() {
    var renderAnts = () => {
      var antArray = this.state.ants;
      var orderedArray = antFilter(antArray)
      if(orderedArray){
        return orderedArray.map((ant) => <Ant key={ant.name} {...ant}/>)
      }
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={ant} className="App-logo" alt="ant" />
          <div className="calculate-bttn" onClick={this.intialLoading}>Run</div>
          <p className="run-status">{this.state.loadingStatus}</p>
        </div>


        <div>
          <h1>Ant Race</h1>
          <div  className="created-by-link">
            <a href="http://stephengrable.com">Created by Stephen Grable</a>
          </div>
        {renderAnts()}
      </div>
      <footer className="footer"><a href="http://stephengrable.com">Created by Stephen Grable</a></footer>
    </div>
    );
  }
}

export default App;