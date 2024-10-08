import { Calendar } from 'antd';
import React from 'react';
import moment from 'moment'; // 导入 moment
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} locale='zh-cn' />;
};

export default App;
