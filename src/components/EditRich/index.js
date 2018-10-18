/**
 * Created by admin on 2018/10/15.
 */

import React from 'react';
import { Button, notification, Card } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class EditRich extends React.Component {
  state = {
    value: 'test',
  };

  handleChange = value => {
    this.setState({
      value,
    });
  };

  prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: this.state.value }} />,
    });
  };

  modules = () => {
    let toolsBar = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    };
    return toolsBar;
  };
  formats = () => {
    let formatsList = {
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
      ],
    };
    return formatsList;
  };

  render() {
    const toolsBar = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
    const formatsList = {
      formats: [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
      ],
    };
    return (
      <Card title="富文本编辑器">
        <ReactQuill
          value={this.state.value}
          onChange={this.handleChange}
          modules={toolsBar}
          formats={formatsList}
        />
        <Button style={{ marginTop: 16 }} onClick={this.prompt}>
          Prompt
        </Button>
      </Card>
    );
  }
}
