import "./SelectInput.css";
import React from "react";

export default class SelectInput extends React.Component {
  render() {
    return (
      <select className="SelectInput" value={this.props.value} onChange={evt => this.props.onChange(evt.target.value)}>
        {
          this.props.options.map((option, i) => (
            <option value={option} key={i}>{option}</option>
          ))
        }
      </select>
    );
  }
}
