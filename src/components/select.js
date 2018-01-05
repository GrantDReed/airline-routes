import React, {Component} from 'react';

class Select extends Component {
  static defaultProps = {
      options: [],
      title: 'Please select',
      valueKey: '',
      titleKey: '',
      value: 'all',
      allTitle: 'All',
      onSelect: (value) => null,
      enabledKey: undefined,
  }

  handleChange = (event) => {
    this.props.onSelect(event.target.value);
  }

  render() {

    const options = this.props.options.map((option) => {
      const value = option[this.props.valueKey];
        return(
          <option key={value} value={value}>
            { option[this.props.titleKey] }
          </option>
        );
    });

    options.unshift(<option key="all" value="all">{this.props.allTitle}</option>);

    return(
      <select value={this.props.value} onChange={this.handleChange}>
        { options }
      </select>
    );
  }
}

export default Select;