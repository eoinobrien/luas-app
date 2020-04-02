import React from 'react';
import renderer from 'react-test-renderer';
import FavouriteStar from './FavouriteStar';


test('renders correctly', () => {
  const favouriteClick = () => {
    console.log("click");
  }

  const tree = renderer
    .create(<FavouriteStar isFavourite={false} favouriteClick={favouriteClick} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
