import './FormMessage.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface FormMessageProps {
  children?: React.ReactChildren;
  type?: 'Info' | 'Error'
}

const FormMessage = (props: FormMessageProps) => {
  const { type, children } = props;
  const cssClass = classnames('FormMessage', `FormMessage--${props.type || 'Info'}`, {
    'FormMessage--has-value': React.Children.count(children) > 0
  });
  return (
    <div className={cssClass}>
      {children}
    </div>
  );
};
export default FormMessage;