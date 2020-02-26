import React from 'react';
import './App.scss';
import Track from './components/Track';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.justTitles = this.justTitles.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    fetch(`https://api.deezer.com/search?q=${this.state.searchWord}`)
    .then(results=>{
      return results.json();
    }).then(
      data =>{
        console.log(data)
        this.setState({data: this.justTitles(data.data)
        })
      }
    )
  }

  justTitles(arr){
    const newArr = []
    arr.map(item=>{
      return newArr.push({track: item.title, artist: item.artist.name, cover: item.album.cover})
    }
    )
    return newArr
  }

  handleChange(event){
    console.log(event.target.value)
    this.setState({searchWord: event.target.value});
  }

  render(){
    const trackList = this.state.data.map(track=>{
      return <Track data={track.track}></Track>
    })

    console.log(this.state)
    return (
      <div className="App">
        <p></p>
      <form onSubmit={this.handleSubmit} >
        <label>
        Search a track:
        <input type="text" value={this.state.searchWord} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        <div className="track-card-container">
          {trackList} 
        </div>
      </div>
    );
  }
}

export default App;
