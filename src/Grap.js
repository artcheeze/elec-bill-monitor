
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, ComposedChart, Line,  Bar, XAxis,  CartesianGrid, Tooltip,
} from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6} style={{ fontSize: '10px' }}>{`${value}`}</text>;
};
export default class Example extends PureComponent {
  static jsfiddleUrl = '//jsfiddle.net/alidingling/9wnuL90w/';

  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={this.props.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" style={{fontSize: '10px'}} />
            <Tooltip />
            <Bar dataKey="uv" barSize={20} fill="#413ea0"  label={renderCustomBarLabel}/>
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
