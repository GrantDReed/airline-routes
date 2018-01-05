import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

import Table from './components/table.js';
import Select from './components/select.js';

class App extends Component {
  state = {
    airline: 'all'
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  };

  selectAirline = (value) => {
    if (value !== 'all') {
      value = parseInt(value, 10);
    }
    this.setState({airline: value});
  }

  routeHasCurrentAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === 'all';
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutesByAirline = DATA.routes.filter(this.routeHasCurrentAirline)
    const airlines = DATA.airlines;

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
        <p>
          Show routes on
          <Select
            options={airlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.airline}
            onSelect={this.selectAirline}
          />
        </p>
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutesByAirline}
          format={this.formatValue}
        />
      </div>
    );
  }
}

export default App;