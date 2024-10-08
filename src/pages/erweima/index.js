import React, { useState, useRef } from 'react';
// import QRCode from 'qrcode.react';
import { QRCodeCanvas } from 'qrcode.react'; // 如果你需要画布

import { QRNormal } from 'react-qrbtf';
import html2canvas from 'html2canvas';
import logo from './pic.png'; // 替换为你的 logo 文件路径

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const qrCodeRef = useRef(null);
  const qrNormalRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const qrCanvas = qrCodeRef.current.getElementsByTagName('canvas')[0];
     
      html2canvas(qrCanvas).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qrcode_with_logo.png';
        link.click();
      });
    }
  };

  const handleDownload2 = () => {
    if (qrNormalRef.current) {
      const qrNormalContainer = qrNormalRef.current;
  
      html2canvas(qrNormalContainer).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qrcode_normal.png';
        link.click();
      }).catch((error) => {
        console.log('error', error);
      });
    }
  };

  return (
    <div style={{ margin: '100px' }}>
      {/* <h1>QR Code Generator with Logo</h1> */}
      <label htmlFor="text">输入文案:</label>
      <input
        type="text"
        id="text"
        value={text}
        onChange={handleTextChange}
        placeholder="在这里输入文案"
      />
      {text && (
        <div style={{display:"flex"}}>
          <div style={{width:"300px",height:"300px"}}>
            <h2>生成的带 Logo 的二维码:</h2>
            <div ref={qrCodeRef}>
              <QRCodeCanvas
                value={text}
                logoImage={logo}
                logoWidth={80} // 根据需要调整 logo 的宽度
                logoHeight={80} // 根据需要调整 logo 的高度
                style={{ width: '200px',height: '200px',margin: "50px"}}
              />
            </div>
            <button onClick={handleDownload}>下载二维码1</button>
          </div>

          <div style={{width:"300px",height:"300px"}}>
            <h2>生成的普通二维码:</h2>
            <div ref={qrNormalRef}>
              <QRNormal
                value={text}
                className="my-qrcode"
                // styles={{ svg: { width: '400px'} }}
                type="round"
                size={80}
                opacity={80}
                posType="planet"
                otherColor="#000000"
                posColor="#33CCCC"
              />
            </div>
            <button onClick={handleDownload2}>下载二维码2</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;