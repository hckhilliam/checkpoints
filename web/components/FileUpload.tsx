import './FileUpload.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import * as Dropzone from 'react-dropzone';
import { AddLinearProgress } from './LinearProgress';

interface Props extends React.HTMLAttributes {
  accept?: string;
  body?: React.ReactNode;
  disablePreview?: boolean;
  onUpload: (acceptedFiles: File[], rejectedFiles: File[]) => void;
}

interface State {

}

class FileUpload extends React.Component<Props, State> {
  static defaultProps: Props = {
    body: 'Add Files',
    disablePreview: false,
    onUpload: () => {}
  };

  handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    this.props.onUpload(acceptedFiles, rejectedFiles);
  };

  render() {
    const { className, children, accept, body, disablePreview, onUpload } = this.props;
    const other = _.omit(this.props, 'className', 'accept', 'body', 'disablePreview', 'onUpload', 'children');
    const cssClass = classnames('FileUpload', className);

    return (
      <div className={cssClass} {...other}>
        <Dropzone
          className="FileUpload-dropzone"
          activeClassName="FileUpload-dropzone--active"
          accept={accept}
          disablePreview={disablePreview}
          onDrop={this.handleDrop}
        >
          <div className="FileUpload-content">
            {body}
            {children}
          </div>
        </Dropzone>
      </div>
    );
  }
}

const FileUploader = AddLinearProgress(FileUpload);
export default FileUploader;
