import './Checkbox.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import { Field, WrappedFieldProps } from 'redux-form';

import { InkRippleElement } from './InkRipple';

interface Props extends React.HTMLAttributes {
  label?: string;
}

interface CheckboxIconProps {
  checked?: boolean;
}

let CheckboxIcon = (props: CheckboxIconProps & React.HTMLAttributes) => {
  const { children, checked } = props;
  const cssClass = classnames('CheckboxIcon', {
    'CheckboxIcon--checked': checked
  });

  return (
    <div className={cssClass}>
      <div className="CheckboxIcon-icon" />
      <InkRippleElement toggle={checked} duration="Fast" shade="Dark" size={32} />
    </div>
  );
};

export default class Checkbox extends React.Component<Props, {}> {
  static defaultProps: Props = {
    label: ''
  };

  render() {
    const { className, style, name, label } = this.props;
    const props = _.pick(this.props, 'style');
    const inputProps = _.omit(this.props, 'className', 'style', 'label');
    const cssClass = classnames('Checkbox', className);
    return (
      <div className={cssClass} {...props}>
        <label className="Checkbox-label">
          <input type="checkbox" {...inputProps} />
          <CheckboxIcon checked={this.props.checked} />
          <span>{label}</span>
        </label>
      </div>
    );
  }
}

const CheckboxFieldComponent = (props: Props) => {
  const { input, meta } = props;
  const other = _.omit(props, 'input', 'meta');
  return <Checkbox {...input} {...other} checked={!!input.value} />;
};

export const CheckboxField = (props: Props) => <Field component={CheckboxFieldComponent} normalize={value => !!value} {...props} />;
