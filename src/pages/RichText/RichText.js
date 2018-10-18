import React, { PureComponent } from 'react';

import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card, Upload, Modal } from 'antd';
import ReactCoreImageUpload from 'react-core-image-upload';
// import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditRich from '@/components/EditRich';
import PictureWall from '@/components/PictureWall';

class RichText extends PureComponent {
  imageuploaded(res) {
    if (res.errcode == 0) {
      this.setState({
        src: res.data.src,
      });
    }
  }
  render() {
    return (
      <PageHeaderWrapper>
        <PictureWall />
        <EditRich />
      </PageHeaderWrapper>
    );
  }
}

/*export default () => (
  <PageHeaderWrapper>
    <PictureWall/>
    <ReactCoreImageUpload
      text="Upload Your Image"
      className="btn btn-primary"
      inputOfFile="files"
      url="http://101.198.151.190/api/upload.php"
      imageUploaded={this.imageuploaded}>
    </ReactCoreImageUpload>
    <EditRich />
  </PageHeaderWrapper>
);*/
export default RichText;
