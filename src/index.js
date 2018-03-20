import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Ideas from './components/Ideas/Ideas';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Ideas />, document.getElementById('root'));
registerServiceWorker();
