import { Upload, Icon, Modal } from 'antd';
import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
import request from '../../utils/request';

export default class PictureWall extends React.Component {
  state = {
    src: '',
    cropResult: null,
    previewVisible: false,
    corpBoxVisible: false,
    submitting: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false, corpBoxVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  onChange = e => {
    debugger;
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  };

  handleChange = ({ fileList }) => {
    debugger;
    this.setState({ fileList });
  };
  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      corpBoxVisible: true,
    });
  };
  handleFileChange = e => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= 20400) {
        this.setState(
          {
            selectedImageFile: file,
          },
          () => {
            this.setState({
              editImageModalVisible: true,
            });
          }
        );
      } else {
        message.error('文件过大');
      }
    }

    e.target.value = '';
  };
  //剪切后上传图片
  handleSubmitPic = () => {
    debugger;
    let data = this.cropper.getCroppedCanvas();
    this.cropper.getCroppedCanvas().toBlob(async blob => {
      debugger;
      // 创造提交表单数据对象
      const formData = new FormData();
      // 添加要上传的文件
      formData.append('file', blob, 'hehe');
      console.log(formData);
      // 提示开始上传
      this.setState({ submitting: true });
      // 上传图片
      // const resp = await request("http://118.31.40.33:8080/huahai/admin/upload", formData)
      const resp = request('http://118.31.40.33:8080/huahai/admin/upload', {
        method: 'POST',
        body: formData,
      });
      // 拿到服务器返回的数据
      if (resp.code === 200) {
        this.props.onUploadedFile(resp.data);
        // 提示上传完毕
        this.setState({ submitting: false });
        // 关闭弹窗
        this.props.onClose();
      }
    });
    /*  if (!this.state.submitting) {
     let url = `/homepage_images`
     // 拿到文件名
     let filename = this.props.uploadedImageFile.name


     message.info("正在上传图片")
     this.cropper.getCroppedCanvas().toBlob(async blob => {
     // 创造提交表单数据对象
     const formData = new FormData()
     // 添加要上传的文件
     formData.append('file', blob, filename)
     // 提示开始上传
     this.setState({submitting: true})
     // 上传图片
     const resp = await http.post(url, formData)
     // 拿到服务器返回的数据
     this.props.onUploadedFile(resp.data.data)
     // 提示上传完毕
     this.setState({submitting: false})
     // 关闭弹窗
     this.props.onClose()
     })
     }*/
  };
  render() {
    const { previewVisible, previewImage, fileList, src, cropResult, corpBoxVisible } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <input type="file" onChange={this.onChange} />
        <label className="add-img-btn">
          <span>添加图片</span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="base-upload-input"
            onChange={this.onChange}
          />
        </label>

        <Cropper
          style={{ height: 400, width: '100%' }}
          aspectRatio={16 / 9}
          preview=".img-preview"
          guides={false}
          src={this.state.src}
          ref={cropper => {
            this.cropper = cropper;
          }}
        />

        <button onClick={this.cropImage} style={{ float: 'right' }}>
          Crop Image
        </button>
        <Modal visible={corpBoxVisible} onOk={this.handleSubmitPic} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
        </Modal>

        {/*<div>
         <div className="box" style={{ width: '50%', float: 'right' }}>
         <h1>Preview</h1>
         <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
         </div>
         <div className="box" style={{ width: '50%', float: 'right' }}>
         <h1>
         <span>Crop</span>
         <button onClick={this.cropImage} style={{ float: 'right' }}>
         Crop Image
         </button>
         </h1>
         <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
         </div>
         </div>*/}
      </div>
    );
  }
}
