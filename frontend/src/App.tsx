import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const csrf = await axios.get('토큰');
                setCsrfToken(csrf.data.csrfToken)
            } catch (e: any) {
                console.log('csrfToken No', e)
            }
        }
        fetchCsrfToken();
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signin', {id, pw},
                {
                headers: {
                    'X-CSRF-Token': csrfToken,
                }});
            setMessage(response.data.message)
        }catch (e: any) {
            setMessage(e.response.data.message)
        }
    }

    return <div>
        <form action='/signin' onSubmit={handleLogin}>
            <label htmlFor='meber_id'>
                <input type='text' value={id} name='meber_id' onChange={(e) => setId(e.target.value)}/>
            </label>
            <label htmlFor='meber_pwd'>
                <input type='password' value={pw} name='meber_pwd' onChange={(e) => setPw(e.target.value)}/>
            </label>
            <button type='submit'>Login</button>
        </form>
        <p>{message}</p>
    </div>;
}

export default App;
