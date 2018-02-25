import React, { Component } from 'react';
import ant from './ant.png';
import './App.css';
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
    //this is where I believe redux pure functions could be used the simplify the state changing mechanism. 
    //Here I rebuild state by created a copy and providing the app with an entirely new state array (full of ant objects)
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
    var odds = this.generateAntWinLikelihoodCalculator();
    var promise = new Promise(function(resolve, reject){      
      odds(function(likelyhood){
        resolve(likelyhood)
      })
    })
    
    promise.then((response) => {
      this.updateSingleAntState(antItem, response, "complete")
    });
  }

  updateSingleAntState(newAnt, likelyhood, status) {
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

    if(status === "complete"){
      this.setState({loadingStatus: "completed"})
    }
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
          <div onClick={this.intialLoading}>Calculate Odds</div>
          <p>{this.state.loadingStatus}</p>
        {renderAnts()}
      </div>
    </div>
    );
  }
}

export default App;