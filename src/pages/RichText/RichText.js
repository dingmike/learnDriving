import React, { PureComponent } from 'react';

// import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditRich from '@/components/EditRich';
import PictureWall from '@/components/PictureWall';

class RichText extends PureComponent {
  imageuploaded(res) {
    if (res.errcode === 0) {
      this.setState({
        // src: res.data.src,
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
export default RichText;
