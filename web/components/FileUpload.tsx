import * as React from 'react';
import { connect } from 'react-redux';

import * as Dropzone from 'react-dropzone';

interface Props {
  title: string;
  description: string;
  onDrop?: (file) => void ;
  // onDrop: (file) => void ; diff between ? and
}

interface State {
  files: File[];
}

// const FileUpload = (props: FileUploadProps) => {
export default class FileUpload extends React.Component<Props, State> {

  state: State = {
    files: []
  }

  addFile = (file) => {
    console.log("hello");
    console.log(file);

    this.setState({
      files: file
    });
    // this.props.onDrop()
  }
  render() {
    const { title, description } = this.props;
    return (
      <div>
        <Dropzone onDrop={this.addFile}>
          <div> {description} </div>
        </Dropzone>
                {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                </div> : null}
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
    onUploadFiles: (files) => {
      // dispatch(uploadFiles(files));
    }
  };
};
export const FileUploader = connect(mapStateToProps, mapDispatchToProps)(FileUpload);
