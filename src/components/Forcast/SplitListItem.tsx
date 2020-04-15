import React from 'react';
import './SplitListItem.scss';

interface SplitListItemProps {
  left: string;
  right?: string;
}

const SplitListItem: React.FC<SplitListItemProps> = (props: SplitListItemProps) => {
  return (
    <li className="direction-forcast-item">
      <div className="left">{props.left}</div>
      <div className="right">{props.right !== null && props.right}</div>
    </li>
  );
}

export default SplitListItem;
