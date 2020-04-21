import React from 'react';
import Calculator from "./Calculator"
import "./style.css"

class App extends React.Component{
  render(){
    return(
      <div className ="App">
        <h1>Smart Calculator</h1>
        <Calculator/>
      </div>
    )
  }
}
export default App