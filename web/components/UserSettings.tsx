import './UserSettings.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, initialize, reset, Field } from 'redux-form';

import Geosuggest from 'react-geosuggest';

import Form from './Form';
import { InputField } from './Input';
import { Button } from './Button';
import { CheckboxField } from './Checkbox';
import FormButtons from './FormButtons';

import { getUserInfo } from '../actions/users';
import { updateUserSettings, validate } from '../lib/forms/userSettings';

interface Props extends React.HTMLAttributes {
  user?: Checkpoints.User;
}

export class UserSettings extends React.Component<Props, {}>{
  render() {
    const { user } = this.props;
    const other = _.omit(this.props, 'user');
    return (
      <Form {...other}>
        <InputField label="Name" name="name"/>
        <span> Hometown 
          <Field name="location" component = { props =>
          {
            return (
              <Geosuggest initialValue={props.input.value.name} onSuggestSelect={param => {
                props.input.value.name = param.label;
                props.input.value.lat = param.location.lat;
                props.input.value.lng = param.location.lng;
              }}/>
            );
          }}/>
        </span>    
        <CheckboxField label="Subcribed to emails" name="settings.isSubscribed" />
        <FormButtons>
          <Button type="submit" primary>Save</Button>
        </FormButtons>
      </Form>
    )
  }
}

const UserSettingsReduxForm = reduxForm({
  form: 'UserSettings',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.User, dispatch) => {
    return updateUserSettings(values).then(() => {
      dispatch(getUserInfo());
    }).catch(err => new SubmissionError({ _error: err}));
  }
})(UserSettings);

export default UserSettingsReduxForm;

const mapStateToProps = (state: Checkpoints.State) => {
  const user = state.users.me as Checkpoints.User;
  return {
    initialValues: {
      name: user.name,
      settings: user.settings,
      location: user.location
    }
  };
};

export const UserSettingsForm = connect(mapStateToProps)(UserSettingsReduxForm);
