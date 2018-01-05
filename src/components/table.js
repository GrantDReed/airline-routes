import React, { Component } from 'react';



class Table extends Component {
  static defaultProps = {
      columns: [{name: 'header', property: 'value'}],
      rows: [{id: 1, value: 'cell'}],
      format: (property, value) => value,
      perPage: 25,
      className: "table"
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  previousPage = () => {
    this.setState({page: this.state.page - 1});
  }

  nextPage = () => {
    this.setState({page: this.state.page + 1});
  }

  render() {
    const start = this.state.page * this.props.perPage;
    const headers = this.props.columns.map((col) => <th key={col.name}>{col.name}</th>)
    const rows = this.props.rows.slice(start, start + this.props.perPage).map((row) => (
      <tr key={Object.values(row).join(':')}>
        {this.props.columns.map((col) => (
          <td key={col.property + row[col.property]}>{this.props.format(col.property, row[col.property])}</td>
        ))}
      </tr>
    ));


    return(
      <div>
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
        <div className="pagination">
          <p>Showing {start + 1} - {start + rows.length} of {this.props.rows.length} routes</p>
          <p>
            <button
              key="previous"
              disabled={this.state.page === 0}
              onClick={this.previousPage}
            >
              Previous Page
            </button>
            <button
              key="next"
              disabled={this.state.page === Math.ceil(this.props.rows.length / this.props.perPage) - 1}
              onClick={this.nextPage}
            >
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;