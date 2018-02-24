import React, { Component } from 'react';
import './Ant.css';

class Ant extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
   console.log(this.props)
  }

  render() {
    var {name, color, length, weight, likelyhood, status} = this.props;
    var renderStatus = () => {
        if(!status){
            return "Not yet calculated";
        } else {
            return status;
        }
    }
    var renderInfo = () => {
        return (
            <ul>
                <li>{color}</li>
                <li>{length}</li>
                <li>{weight}</li>
                <li>{likelyhood}</li>
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