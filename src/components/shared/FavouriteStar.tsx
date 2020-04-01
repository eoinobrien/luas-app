import React, { ReactElement } from 'react';
import './FavouriteStar.scss';
import { ReactComponent as Star } from '../../star.svg';
import { ReactComponent as StarFill } from '../../star-fill.svg';

interface FavouriteStarProps {
  favouriteClick: any;
  favourite: boolean;
}

function FavouriteStar(props: FavouriteStarProps): ReactElement {
  return (
    <button className="favourite-star" onClick={() => props.favouriteClick()}>
      {props.favourite ? <StarFill /> : <Star />}
    </button>
  );
}

export default FavouriteStar;
