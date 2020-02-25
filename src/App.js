import React from 'react';
import './App.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { data: ""};
    this.handlesearch = this.handlesearch.bind(this)
  }

  handlesearch(){
    fetch(`https://api.deezer.com/search?q=${searchWord}`)
    .then(results=>{
      return results.json();
    }).then(
      data =>{
        this.setState({data: JSON.stringify(data)})
      }
    )
    console.log(this.state)
  }
  

  render(){
    return (
      <div className="App">
        {this.state.data}
        <button onClick={this.handlesearch}></button>
      </div>
    );
  }
  
}

export default App;
