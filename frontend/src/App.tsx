import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/test').then((res) => {
      setHello(res.data);
    });
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();

    console.log('asd');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          아이디
          <input type='text' id='member_id' name='member_id' />
        </label>
        <label htmlFor='member_pwd'>
          비밀번호
          <input type='password' id='member_pwd' name='member_pwd' />
        </label>
        <button type='submit' className='submit-btn'>
          제출
        </button>
      </form>
    </div>
  );
}

export default App;
