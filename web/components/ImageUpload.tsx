import './ImageUpload.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import FileUpload from './FileUpload';
import { MaterialIcon } from './Icon';
import LinearProgress from './LinearProgress';
import Picture from './Picture';

import imageupload from '../lib/imageupload';

interface Props extends React.HTMLAttributes {
  onUpload: (images: Checkpoints.Picture[]) => void;
}

interface State {
  loading?: boolean;
  files?: File[];
  pictures?: Checkpoints.Picture[];
}

function parseImage(file: File): Promise<Checkpoints.Picture> {
  return new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = () => {
      const image = new Image();
      image.onload = () => {
        resolve({
          url: file['preview'],
          width: image.width,
          height: image.height
        });
      };
      image.src = fr.result;
    }
    fr.readAsDataURL(file);
  });
}

const ImageUploadBody = () => {
  return (
    <div className="ImageUploadBody">
      <MaterialIcon icon="add_a_photo" />
      <div>Add Photos</div>
    </div>
  );
}

export default class ImageUpload extends React.Component<Props, State> {
  static defaultProps: Props = {
    onUpload: () => Promise.resolve()
  };

  state: State = {
    loading: false,
    files: [],
    pictures: []
  };

  handleUpload = (acceptedFiles: File[], rejectedFiles: File[]) => {
    this.setState({ loading: true, files: this.state.files.concat(acceptedFiles) });

    Promise.all(acceptedFiles.map(parseImage))
      .then(pictures => {
        this.setState({ pictures: this.state.pictures.concat(pictures) });
      });

    const deferred = acceptedFiles.map(file => {
      return imageupload(file);
    });
    Promise.all(deferred)
      .then(images => {
        this.setState({
          loading: false,
          files: _.difference(this.state.files, acceptedFiles),
          pictures: _.differenceWith(this.state.pictures, acceptedFiles, (p, f) => p.url == f.preview)
        });
        this.props.onUpload(images);
      });
  };

  render() {
    const { className, children, onUpload } = this.props;
    const other = _.omit(this.props, 'className', 'onUpload', 'children');
    const cssClass = classnames('ImageUpload', 'row', className);

    return (
      <div className={cssClass} {...other}>
        {
          this.state.pictures.map(picture => (
            <Picture className="ImageUploadPreview col-xs-6 col-sm-3 col-md-4 col-lg-2" key={picture.url} picture={picture}>
              <div className="ImageUploadPreview-overlay">
                <MaterialIcon icon="cloud_upload" iconSize="Large" />
                <LinearProgress enabled={true} />
              </div>
            </Picture>
          ))
        }
        <FileUpload className="ImageUpload-upload col-xs-6 col-sm-3 col-md-4 col-lg-2" accept="image/*" onUpload={this.handleUpload} body={<ImageUploadBody />} />
      </div>
    );
  }
}
