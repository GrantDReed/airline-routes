import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

import Table from './components/table.js';

class App extends Component {
  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  };

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const routes = DATA.routes;

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
          className="routes-table"
          columns={columns}
          rows={routes}
          format={this.formatValue} />
      </div>
    );
  }
}

export default App;