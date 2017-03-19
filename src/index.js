import React from 'react';
import ReactDOM from 'react-dom';
import PollBox from './PollBox';
import './index.css';

ReactDOM.render(
  <PollBox url="http://localhost:3001/api/polls" />,
  document.getElementById('root')
);
