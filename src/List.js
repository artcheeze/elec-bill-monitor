
import React, { Component } from 'react';


import "./List.css"
import { FaSortUp } from 'react-icons/fa';
class List extends Component {
  state = {
    vector: [],
    n:[],
    diff:[]
  }



  componentDidMount() {
    setTimeout(() => {
      this.props.data.forEach(e => {this.setState({n: this.state.n.concat(e.uv)})})
      this.props.data.forEach((e,i) => {
        var num = e.uv-this.state.n[i+1]
        var dif =num.toFixed(2)
        this.setState({diff: this.state.diff.concat({"name":e.name,"uv":dif})})
        var temp = (
          <div className="listItem" >
            <div class="w-100"></div>
            <div className="row " id="itemlist">
              <div className="col-4">
                {e.name}
              </div>
              <div style={{color:'#8821c4'}}  className="col-4">
              {e.uv}
              </div>
              <div className="col-4" style={{textAlign:'left',color:'red'}}>
               {<FaSortUp/>}{dif}
              </div>
            </div>
          </div>

        )

        this.setState({
          vector: this.state.vector.concat(temp)
        })


      });
      this.props.setDiffer(this.state.diff)
    }, 100)
  
  }

  render() {
    return (
      <div className="List">
        <div className="dataList">

          <div className="row ">
            <div className="col-4">
              <b>Date</b>
            </div>
            <div className="col-4">
              <b>Amount</b>
            </div>
            <div className="col-4">
              <b>Differ</b>
            </div>
          </div>
          <hr></hr>
          {
            this.state.vector.map(e=>{return e})
          }




        </div>
      </div>
    );
  }
}

export default List;
