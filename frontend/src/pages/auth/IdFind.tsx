import React, {useState} from "react";
import styles from "./Findauth.module.css";
import axios from "axios";
import {Link} from "react-router-dom";


interface IdFind {
    email: string;
    name: string;
}

const IdFind = () => {
    const [user, setUser] = useState<IdFind>({
        email: "",
        name: "",
    })
    const [id, setId] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/member/id/find', user)
            const data = response.data;
            setId(data);
        } catch (e) {
            console.error(e);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(user)
    }


    return (
        <div className={styles.find_form_container}>
            <div className={styles.find_container}>
                <h3 className={styles.find_text}>아이디 찾기</h3>
                <form className={styles.find_form} onSubmit={handleSubmit}>
                    <ul className={styles.ul_form}>
                        <li className={styles.find_id}>
                            {id}
                        </li>
                        <li>
                            <label>
                                <input placeholder="이름" className={styles.find_input}
                                       type='name'
                                       name='name'
                                       value={user.name}
                                       onChange={handleChange}/>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="이메일 입력"
                                    className={styles.find_input}
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </li>
                        <li>
                            <Link to='/login/passwordFind'>
                                <p>비밀번호 찾기</p>
                            </Link>
                        </li>
                    </ul>
                    <button className={styles.ul_form_btn}>인증</button>
                </form>
            </div>
        </div>
    );
};

export default IdFind;
