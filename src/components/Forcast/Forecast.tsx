import React, { ReactElement } from 'react';
import './Forecast.scss';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import StationForecast from '../../models/StationForecast';
import DirectionForecasts from './DirectionForecasts';
import Line from '../../models/Line';
import { ReactComponent as LeftArrow } from '../../arrow-left-circle.svg';
import FavouriteStar from '../shared/FavouriteStar';
import Station from '../../models/Station';
// import OperatingHours from '../OperatingHours/OperatingHours';

interface ForecastRouteProps {
  abbreviation: string;
}

interface ForecastProps extends RouteComponentProps<ForecastRouteProps> {
  favouriteClick: any;
  favouriteStations: Station[];
}

interface ForecastState {
  loading: boolean;
  forecast: StationForecast;
  error: boolean;
  updating: boolean;
  secondsSinceUpdate: number;
  lastUpdate: Date;
}

class Forecast extends React.Component<ForecastProps, ForecastState> {
  constructor(props: ForecastProps) {
    super(props);

    this.state = {
      forecast: {} as StationForecast,
      loading: true,
      error: false,
      updating: false,
      secondsSinceUpdate: 0,
      lastUpdate: new Date(0)
    }
  }

  private apiInterval: any;
  private secondInterval: any;

  componentDidMount(): void {
    this.getForecastFromApi();

    this.secondInterval = setInterval(() => this.getSecondsToUpdate(this.state.lastUpdate), 1000);
    this.apiInterval = setInterval(this.getForecastFromApi.bind(this), 15000);
  }

  componentWillUnmount(): void {
    clearInterval(this.secondInterval);
    clearInterval(this.apiInterval);
  }


  componentDidUpdate(prevProps: RouteComponentProps<ForecastRouteProps>) {
    if (this.props.match.params.abbreviation !== prevProps.match.params.abbreviation) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.getForecastFromApi();
    }
  }


  getForecastFromApi(): void {
    this.setState({updating: true});

    fetch(`https://luasapifunction.azurewebsites.net/api/stations/${this.props.match.params.abbreviation}/forecast`)
      .then(response => response.json())
      .then(response =>
        this.setState({
          loading: false,
          forecast: response,
          updating: false,
          lastUpdate: new Date()
        }))
      .catch(() =>
        this.setState({
          loading: false,
          error: true,
          updating: false,
          lastUpdate: new Date()
        }));
  }

  favouriteStationClick() {
    this.props.favouriteClick(this.state.forecast.station)
  }

  getSecondsToUpdate(time: Date) {
    let secondsToUpdate: number = 15 - Math.abs(Math.ceil((time.getTime() - Date.now())/1000));
    this.setState({secondsSinceUpdate: secondsToUpdate})
    return secondsToUpdate;
  }

  render(): ReactElement {
    return (
      <div className="forecast">
        <header style={(this.state.loading && { borderColor: '#424242' }) || (this.state.forecast.station.line.toString() === Line[Line.Red] ? { borderColor: '#f44336' } : { borderColor: '#4caf50' })}>
          <Link className="back-arrow" to={`/line/${!this.state.loading && this.state.forecast.station.line}`}><LeftArrow /></Link>
          <h1>
            {(this.state.loading && this.props.match.params.abbreviation)
              || this.state.forecast.station.name} <span>{!this.state.loading && this.state.forecast.station.irishName}</span></h1>

          <FavouriteStar isFavourite={this.props.favouriteStations.filter(s => s.abbreviation === this.props.match.params.abbreviation).length !== 0} favouriteClick={this.favouriteStationClick.bind(this)} />
        </header>

        <main>
          {this.state.loading &&
            <h1>Loading...</h1>}

          {this.state.error &&
            <h1>Error getting data</h1>}

          {!this.state.loading &&
            <div>
              <h4 className="updating">{this.state.updating ? "Updating..." : "Updating in " + this.state.secondsSinceUpdate + " seconds."}</h4>
              <div>
                <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Eastbound" : "Northbound"} forecasts={this.state.forecast.inboundTrams} />
                <DirectionForecasts direction={this.state.forecast.station.line.toString() === Line[Line.Red] ? "Westbound" : "Southbound"} forecasts={this.state.forecast.outboundTrams} />
              </div>

              <h3 className="message">{this.state.forecast.message}</h3>
              {/* <OperatingHours operatingHours={this.state.forecast.station.operatingHours} /> */}
            </div>}
        </main>
      </div>
    );
  }
};

export default withRouter(Forecast);
