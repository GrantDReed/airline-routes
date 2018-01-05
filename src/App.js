import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

class App extends Component {
  state = {
    tableColumnData: ['Airline', 'Source Airport', 'Destination Airport'],
    tableRowData: DATA.routes,
  };

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
        </section>
        <Table
          columnData={this.state.tableColumnData}
          rowData={this.state.tableRowData}
        />
      </div>
    );
  }
}

class Table extends Component {
  buildColumns = (columnData) => {
    return columnData.map((col) => (<th>{col}</th>));
  };

  buildRows = (rowData) => {
    return rowData.map((row) => (
        <tr>
          <td>{DATA.getAirlineById(row.airline)}</td>
          <td>{DATA.getAirportByCode(row.src)}</td>
          <td>{DATA.getAirportByCode(row.dest)}</td>
        </tr>
      ));
  };

  render() {
    return(
      <table>
        <thead>
          <tr>
            {this.buildColumns(this.props.columnData)}
          </tr>
        </thead>
        <tbody>
          {this.buildRows(this.props.rowData)}
        </tbody>
      </table>
    );
  }
}

export default App;