// @ts-ignore
import React, { FC, useState } from 'react';
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui';
import { Input, Button, Spin } from 'antd';
import { SmileOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { createWorker } from 'tesseract.js';

// img to text
const { TextArea } = Input;

const Index = props => {
  const { } = props;

  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = React.useState(false);

  const convertImageToText = async (imageData) => {
    console.log(imageData, "====imageData")
    if (imageData) {
      setLoading(true);
      try {
        const ret = await dealImg(imageData);
        setText(ret.data.text);
      } catch (error) {
        console.error('Error during OCR recognition:', error);
        setErrorMessage('Error during OCR recognition: ' + error.message);
      } finally {
        setLoading(false);
      };
    } else {
      setErrorMessage('Please select an image first.');
    }
  };

  const dealImg = async (img) => {
    const worker = await createWorker("chi_sim+eng");
    const ret = await worker.recognize(img);
    console.log(ret.data.text, "====1111");
    await worker.terminate();
    return ret;
  };
  const handlePaste = (event) => {
    const pasteData = event.clipboardData.items;
    for (let i = 0; i < pasteData.length; i++) {
      if (pasteData[i].type.indexOf('image') === 0) {
        const imageURL = URL.createObjectURL(pasteData[i].getAsFile());
        setImage(imageURL);
        convertImageToText(imageURL);
      }
    }
  };
  return (
    <>
      <Spin spinning={loading} style={{ height: "100%" }}>
        <UiBody height={'600px'}>
          <UiLeft>
            <TextArea onPaste={handlePaste} placeholder="请黏贴图片"  />
            {/* <input type="text" onPaste={handlePaste} /> */}
            <div style={{marginTop:"20px"}}>
              { image && <img src={image} alt="Pasted from clipboard" /> }
            </div>
          </UiLeft>
          <UiCenter>
            <DoubleRightOutlined style={{ color: '#4390F7', fontSize: '25px' }} />
          </UiCenter>
          <UiRight>
            <TextArea
              style={{ height: '100%' }}
              value={text}
            />
          </UiRight>
        </UiBody>
       
        {
          errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
          )
        }
      </Spin>
    </>
  )
}

export default Index;
