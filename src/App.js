
import React, { Component } from 'react';
import Grap from './Grap'
import { FaSave } from 'react-icons/fa';
import List from './List'

import './App.css';

class App extends Component {
  state = {
    num: "",
    date: new Date().toLocaleString(),
    date2: new Date().toLocaleString(),
    raw: [],
    raw2:[],
    obj: [],
    tap: true
  }
  

  setDiffer(e){
    e.reverse();
    this.setState({raw2: e})
    
  
  }
  async componentDidMount() {
    await this.query();

    setInterval(() => {
      this.setState({
        date2: new Date().toLocaleString()
      })
    }, 1000)


   
  }
   query = async () => {

    this.setState({raw: [],raw2: []})
    await fetch('http://35.186.145.63:5000/query').then(res => res.json()).then(ress => {
      ress.forEach(e => {
        this.setState({
          raw: this.state.raw.concat(e),
         
        })

      });
      this.state.raw.reverse();

    })
    this.forceUpdate();
  }


  save = () => {
    if (this.state.num !== "") {
     
        fetch('http://35.186.145.63:5000/save', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.date, uv: this.state.num })
        })
        this.setState({num: ""})
      
        this.query();
    } else {
      alert('Fill in the blank!')
    }
  
  }


  render() {
    return (
      <div className="App">
        <h4>Daily</h4>
        <h5>{this.state.date2}</h5>
        <header className="App-header" id="header">

          <div className="row">
            <div className="col-8">
              <input type="number" className="form-control" style={{ borderRadius: '1em' }} onChange={(e) => { this.setState({ num: e.target.value }) }} value={this.state.num}/>
            </div>
            <div className="col-4">

              <button type="button" className="btn btn-primary" style={{ color: 'white', borderRadius: '1em' }} id="button1" onClick={() => { this.save() }}><FaSave /> Save</button>
            </div>
          </div>

        </header>

      
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class={this.state.tap ? "btn btn-light" : "btn btn-secondary" } style={!this.state.tap ? {color:'white'} : {color:'purple'}}
            onClick={()=>{this.setState({tap:true})}}>List</button>
            <button type="button" class={!this.state.tap ? "btn btn-light" : "btn btn-secondary" }  style={this.state.tap ? {color:'white'} : {color:'purple'}}
               onClick={()=>{this.setState({tap:false})}}>Graph</button>
            
        </div>

        <div className="graph">
          <div className="graph-container">
            {
              this.state.tap ?
              <List data={this.state.raw} setDiffer={(diff)=>this.setDiffer(diff)} />
              :
              <Grap data={this.state.raw2} />
            }
           
         
          </div>

        </div>

      </div>
    );
  }
}

export default App;
