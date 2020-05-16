import React from 'react';
import logo from './logo.svg';
// import model from './pages/index.js';
import {initThree} from './pages/model1.js';
import {initModel2} from './pages/model2.js';
import {initModel3} from './pages/model3.js';
import {initModel4} from './pages/model4.js';
import './App.css';

function App() {
  React.useEffect(initModel4,[])
  function handleChange(e){
    document.querySelector('#canvasArea').innerHTML = "";
    switch(e.target.value){
      case 'model1':
        initThree(); 
        break;
      case 'model2':
        initModel2();
        break;
      case 'model3':initModel3(); break;
      case 'model4':initModel4(); break;
    }
  }
  return (
    <div className="App">
      <select id="cars" onChange={handleChange}>
        <option value="model1">model1</option>
        <option value="model2">model2</option>
        <option value="model3">model3</option>
        <option value="model4" selected>model4</option>
      </select>
      <div id="canvasArea"></div>
    </div>
  );
}

export default App;
