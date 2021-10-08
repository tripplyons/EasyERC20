import React from 'react';
import SelectInput from '../SelectInput/SelectInput';
import AlignedText from '../AlignedText/AlignedText';
import './LabeledSelectInput.css';

export default class LabeledSelectInput extends React.Component {
  render() {
    return (
      <div className="LabeledSelectInput--container">
        <div className="LabeledSelectInput--column">
          <AlignedText>
            {this.props.children}
          </AlignedText>
        </div>
        <div className="LabeledSelectInput--column">
          <div className="LabeledSelectInput--select-container">
            <SelectInput onChange={this.props.onChange} value={this.props.value} options={this.props.options}>

            </SelectInput>
          </div>
        </div>
      </div>
    );
  }
}