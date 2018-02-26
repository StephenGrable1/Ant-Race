import React, { Component } from 'react';
import './Ant.css';

class Ant extends Component {
  render() {
    var {name, color, length, weight, likelyhood, status} = this.props;
    var renderStatus = () => {
        if(!status){
            return "Not yet calculated";
        } else {
            return "Calculation status: " + status;
        }
    }

    var renderLikelyhood = () => {
        if(likelyhood === 0) {
            return ''
        }  else {
            return "Likelyhood of winning: " + (Math.round(likelyhood*100)) + "%"
        }
    }
    var renderInfo = () => {
        return (
            <ul>
                <li>Color: {color}</li>
                <li>Length: {length}</li>
                <li>Weight: {weight}</li>
                <li>{renderLikelyhood()}</li>
                <li>{renderStatus()}</li>
            </ul>
        )
    }
    return (
      <div className="ant-outer">
      <div className="ant-inner">
      <div className="ant">
       <h4>
           {name}
       </h4>
       <div className="ant-data">
         {renderInfo()}
       </div>
       </div>
      </div>
      </div>
    );
  }
}

export default Ant;