import React from 'react';
import ReactDOM from 'react-dom';
import PollList from './PollList';
import DATA from '../data';
import './index.css';

ReactDOM.render(
  <PollList data={DATA} />,
  document.getElementById('root')
);
