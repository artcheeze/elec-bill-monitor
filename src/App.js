import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React, { Component } from 'react';
import Grap from './Grap'
import { FaSave } from 'react-icons/fa';
import List from './List'

import './App.css';

class App extends Component {
  state = {
    num: "",
    date: new Date().toLocaleDateString(),
    date2: new Date().toLocaleString(),
    raw: [],
    raw2:[],
    obj: [],
    tap: true
  }

  async componentDidMount() {
    await fetch('http://localhost:5000/query').then(res => res.json()).then(ress => {
      ress.forEach(e => {
        this.setState({
          raw: this.state.raw.concat(e),
          raw2: this.state.raw2.concat(e)
        })

      });
      this.state.raw.reverse();

    })


    setInterval(() => {
      this.setState({
        date2: new Date().toLocaleString()
      })
    }, 1000)

   
  }



  save = () => {
    if (this.state.num !== "") {
      fetch('http://localhost:5000/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.date, uv: this.state.num })
      })
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
              <input type="number" className="form-control" style={{ borderRadius: '1em' }} onChange={(e) => { this.setState({ num: e.target.value }) }} />
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
              <List data={this.state.raw} />
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
