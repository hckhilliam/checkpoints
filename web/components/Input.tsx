import './Input.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface InputProps extends React.HTMLAttributes {
  label?: string;
  type?: string;
  float?: boolean;
}

interface InputState {
  focused?: boolean;
  hasValue?: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
  static defaultProps: InputProps = {
    label: '',
    type: 'text',
    float: true,
    value: ''
  }

  state: InputState = {
    focused: false,
    hasValue: false
  }

  componentWillMount() {
    this.updateValue(this.props.value);
  }

  componentWillReceiveProps(newProps: InputProps) {
    this.updateValue(newProps.value);
  }

  updateValue(value) {
    const hasValue = !!value;
    if (this.state.hasValue != hasValue)
      this.setState({ hasValue });
  }

  handleFocus = () => {
    this.setState({ focused: true });
  }

  handleBlur = () => {
    this.setState({ focused: false });
  }

  getClassNames() {
    return {
      'Input--focused': this.state.focused,
      'Input--has-value': this.state.hasValue
    };
  }

  render() {
    const { className, label, float, type } = this.props;
    const other = _.omit(this.props, 'className', 'label', 'float');

    const cssClass = classnames('Input', className, this.getClassNames());

    return (
      <div className={cssClass}>
        {label ? <label className="Input-label">{label}</label> : null }
        <input type={type} onFocus={this.handleFocus} onBlur={this.handleBlur} {...other} />
      </div>
    );
  }
}
