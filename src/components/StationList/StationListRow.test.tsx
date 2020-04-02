import React from 'react';
import renderer from 'react-test-renderer';
import StationListRow from './StationListRow';
import Station from '../../models/Station';
import Line from '../../models/Line';

test('renders correctly', () => {
  const favouriteClick = () => {
    console.log("click");
  }

  let station: Station = {
    name: "Name",
    irishName: "anam",
    pronunciation: "pronounce",
    abbreviation: "NAM",
    line: Line.Red,
    hasCycleParking: false,
    hasParking: false,
    latitude: 0.0,
    longitude: 0.0,
    inboundStations: [],
    outboundStations: [],
    walkingTransfer: [],
    isInUse: true,
    operatingHours: {
      weekdays: {
        inbound: {
          firstTram: "",
          lastTram: "",
        },
        outbound: {
          firstTram: "",
          lastTram: "",
        }
      },
      saturday: {
        inbound: {
          firstTram: "",
          lastTram: "",
        },
        outbound: {
          firstTram: "",
          lastTram: "",
        }
      },
      sunday: {
        inbound: {
          firstTram: "",
          lastTram: "",
        },
        outbound: {
          firstTram: "",
          lastTram: "",
        }
      }
    }
  }

  const tree = renderer
    .create(<StationListRow station={station} favouriteClick={favouriteClick} isFavourite={false}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

