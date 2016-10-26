import './Panel.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface PanelProps extends React.HTMLAttributes {

}

const Panel = (props: PanelProps) => {
  const cssClass = classnames('Panel', props.className);
  const other = _.omit(props, 'className');
  return (
    <div className={cssClass} {...other}>
      {props.children}
    </div>
  );
}
export default Panel;