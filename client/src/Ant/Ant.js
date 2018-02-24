import React, { Component } from 'react';
import './Ant.css';
import likelyhoodGenerator from '../likelyhoodCalculator.js'


class Ant extends Component {
  render() {
    var {name, color, length, weight, likelyhood, status} = this.props;
    var renderStatus = () => {
        if(!status){
            return "Not yet calculated";
        } else {
            return status;
        }
    }

    var renderLikelyhood = () => {
        if(likelyhood === 0) {
            return ''
        }  else {
            return likelyhood
        }
    }
    var renderInfo = () => {
        return (
            <ul>
                <li>{color}</li>
                <li>{length}</li>
                <li>{weight}</li>
                <li>{renderLikelyhood()}</li>
                <li>{renderStatus()}</li>
            </ul>
        )
    }
    return (
      <div className="ant-outer">
       <h1>
           {name}
       </h1>
       {renderInfo()}
      </div>
    );
  }
}

export default Ant;