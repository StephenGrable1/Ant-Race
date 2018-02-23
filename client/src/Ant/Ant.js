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
    var {name, color, length, weight} = this.props;
    var renderInfo = () => {
        return (
            <ul>
                <li>{color}</li>
                <li>{length}</li>
                <li>{weight}</li>
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