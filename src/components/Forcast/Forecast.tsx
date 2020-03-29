import React from 'react';
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
      loading: true,
      forecast: {} as StationForecast,
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
        <div>
          <h1>{(this.state.loading && this.props.match.params.abbreviation)
            || this.state.forecast.station.name}</h1>
          <h2>{!this.state.loading && this.state.forecast.station.line}</h2>
        </div>
        {this.state.loading &&
          <h1>Loading...</h1>}
        {this.state.error &&
          <h1>Error getting data</h1>}
        {!this.state.loading &&
          <div>
            <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Eastbound" : "Northbound"} forecasts={this.state.forecast.inboundTrams} />
            <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Westbound" : "Southbound"} forecasts={this.state.forecast.outboundTrams} />
          </div>}

        <h2 className="message">{!this.state.loading && this.state.forecast.message}</h2>
      </div>
    );
  }
};

export default withRouter(Forecast);
