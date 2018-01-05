import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

import Table from './components/table.js';
import Select from './components/select.js';

class App extends Component {
  defaultState = {
    airline: 'all',
    airport: 'all',
  }

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  selectAirline = (value) => {
    if (value !== 'all') {
      value = parseInt(value, 10);
    }
    this.setState({airline: value});
  }

  selectAirport = (value) => {
    this.setState({airport: value})
  }

  routeHasCurrentAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === 'all';
  }

  routeHasCurrentAirport = (route) => {
    return route.src === this.state.airport ||
           route.dest === this.state.airport ||
           this.state.airport === 'all'
  }

  clearFilters = () => {
    this.setState(this.defaultState);
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutesByAirline = DATA.routes.filter(this.routeHasCurrentAirline);
    const filteredRoutesByAirport = DATA.routes.filter(this.routeHasCurrentAirport);

    const filteredAirlines = DATA.airlines.filter( (airline) => {
      return filteredRoutesByAirport.some( (route) => route.airline === airline.id );
    });

    const filteredAirports = DATA.airports.filter( (airport) => {
      return filteredRoutesByAirline.some( (route) => route.src === airport.code || route.dest === airport.code );
    });

    const filteredRoutes = filteredRoutesByAirline.filter((route) => {
      return this.routeHasCurrentAirline(route) && this.routeHasCurrentAirport(route);
    });

    const defaultsSelected = this.state.airline === this.defaultState.airline && this.state.airport === this.defaultState.airport;

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
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.airline}
            onSelect={this.selectAirline}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            value={this.state.airport}
            onSelect={this.selectAirport}
          />
          <button
            onClick={this.clearFilters}
            disabled={defaultsSelected}
          >
            Show All Routes
          </button>
        </p>
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={this.formatValue}
        />
      </div>
    );
  }
}

export default App;