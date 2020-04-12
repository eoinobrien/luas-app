import React, { ReactElement } from 'react';
import './FavouriteStar.scss';
import { ReactComponent as Star } from './star.svg';
import { ReactComponent as StarFill } from './star-fill.svg';

interface FavouriteStarProps {
  favouriteClick: any;
  isFavourite: boolean;
  name: string;
}

const FavouriteStar: React.FC<FavouriteStarProps> = (props: FavouriteStarProps) => {
  return (
    <button
      className="favourite-star"
      aria-label={"Favourite " + props.name}
      onClick={() => props.favouriteClick()}>
      {props.isFavourite ? <StarFill style={{color: '#fdd835'}} /> : <Star />}
    </button>
  );
}

export default FavouriteStar;
