import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [hi, setHi] = useState('');

    useEffect(() => {
        axios.get('/api/test').then((res) => setHi(res.data));
    }, []);
    return <div className="App">BackEnd {hi}</div>;
}

export default App;
