import React from 'react';
import ReactDOM from 'react-dom';
import Ant from './Ant';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ant />, div);
  ReactDOM.unmountComponentAtNode(div);
});
