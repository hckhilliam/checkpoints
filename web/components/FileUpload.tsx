import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';
import * as Dropzone from 'react-dropzone';

import Button from './Button';

import './FileUpload.scss';

interface Props {
  handleUpload: () => void;
}

interface State {
  files: File[];
}

// const FileUpload = (props: FileUploadProps) => {
export default class FileUpload extends React.Component<Props, State> {

  state: State = {
    files: []
  }

  addFile = (files) => {
    console.log("hello");
    console.log(files);
    this.setState({
      files: files
    });
  }

  render() {
    const { handleUpload } = this.props;
    const cssClass = classnames('FileUpload');
    return (
      <div className={cssClass}>
        <Dropzone onDrop={this.addFile}>
          <div className="DropText"> Drop Files Here </div>
        </Dropzone>
        <Button onClick={handleUpload} primary>Upload</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return  {
  };
};
export const FileUploader = connect(mapStateToProps, mapDispatchToProps)(FileUpload);
