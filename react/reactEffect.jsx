import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count, 'x');
    setTimeout(() => {
      console.log(count, 'y');
    }, 1000);
    return () => {
      console.log(count, 'z');
    };
  });
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>count:{count}</button>
    </div>
  );
};

export default App;
