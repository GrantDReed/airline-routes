import React, { Component } from 'react';

class Table extends Component {
  buildRows = () => {
    return this.props.rows.map((row) => (
      <tr>
        {this.props.columns.map((column) => (
          <td>{this.props.format(column.property, row.property)}</td>
        )).join('')};
      </tr>
    ));
  };

  render() {
    const headers = this.props.columns.map((col) => <th>{col.name}</th>)
    const rows = this.props.rows.map((row) => (
      <tr>
        {this.props.columns.map((column) => (
          <td>{this.props.format(column.property, row[column.property])}</td>
        ))}
      </tr>
    ));

    return(
      <table className={this.props.className}>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Table;