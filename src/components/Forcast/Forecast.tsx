import React from 'react';
import './Forecast.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StationForecast from '../../models/StationForecast';
import DirectionForecasts from './DirectionForecasts';
import Line from '../../models/Line';

interface ForecastRouteProps {
  abbreviation: string,
}

interface ForecastProps extends RouteComponentProps<ForecastRouteProps> {
}

interface ForecastState {
  loading: boolean,
  forecast: StationForecast,
  error: boolean
}


class Forecast extends React.Component<ForecastProps, ForecastState> {
  constructor(props: any) {
    super(props);

    this.state = {
      forecast: {} as StationForecast,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    fetch(`https://luasapifunction.azurewebsites.net/api/stations/${this.props.match.params.abbreviation}/forecast`)
      .then(response => response.json())
      .then(response =>
        this.setState({
          loading: false,
          forecast: response
        }))
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        }));
  }

  render() {
    return (
      <div className="forecast">
        <header>
          {/* <Link to={`/line/${!this.state.loading && this.state.forecast.station.line}`}>Back</Link> */}
          <h1 style={!this.state.loading && this.state.forecast.station.line.toString() === Line[Line.Red] ? { borderColor: '#f44336' } : { borderColor: '#4caf50' }}>
            {(this.state.loading && this.props.match.params.abbreviation)
              || this.state.forecast.station.name} <span>{!this.state.loading && this.state.forecast.station.irishName}</span></h1>
        </header>

        <main>
          {this.state.loading &&
            <h1>Loading...</h1>}

          {this.state.error &&
            <h1>Error getting data</h1>}

          {!this.state.loading &&
            <div>
              <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Eastbound" : "Northbound"} forecasts={this.state.forecast.inboundTrams} />
              <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Westbound" : "Southbound"} forecasts={this.state.forecast.outboundTrams} />
            </div>}

          <h3 className="message">{!this.state.loading && this.state.forecast.message}</h3>
        </main>
      </div>
    );
  }
};

export default withRouter(Forecast);
