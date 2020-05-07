import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import FavouriteStar from './favourite-star';

test('renders without crashing', () => {
    const mockFavouriteClick = jest.fn(x => console.log("clicked"));

    shallow(<FavouriteStar isFavourite={false} favouriteClick={mockFavouriteClick} name="name" />);
    shallow(<FavouriteStar isFavourite={true} favouriteClick={mockFavouriteClick} name="name" />);
});

test('FavouriteStar > Matches snapshot', () => {
    const mockFavouriteClick = jest.fn(x => console.log("clicked"));

    let tree = renderer
        .create(<FavouriteStar isFavourite={false} favouriteClick={mockFavouriteClick} name="station name" />)
        .toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer
        .create(<FavouriteStar isFavourite={true} favouriteClick={mockFavouriteClick} name="station name" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('FavouriteStar > Styles are correct', () => {
    let isFavourite = false;
    const mockFavouriteClick = jest.fn(() => isFavourite = !isFavourite);

    let star = mount(<FavouriteStar isFavourite={isFavourite} favouriteClick={mockFavouriteClick} name="station name" />);

    expect(star.find('svg').prop('style')).toBeUndefined();
    star.simulate('click');
    expect(mockFavouriteClick.mock.calls.length).toBe(1);

    star = mount(<FavouriteStar isFavourite={isFavourite} favouriteClick={mockFavouriteClick} name="station name" />);

    expect(star.find('svg').prop('style')).toHaveProperty('color', '#fdd835');
    star.simulate('click');
    expect(mockFavouriteClick.mock.calls.length).toBe(2);
});
