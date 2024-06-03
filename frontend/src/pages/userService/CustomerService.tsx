import React, { useEffect, useState } from 'react';
import Fixedheader from '../../layout/Header/Fixedheader';
import Header from '../../layout/Header/Header';
import Productcategory from '../../layout/category/Productcategory';
import styles from './CustomerService.module.css';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const CustomerService = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch('/mock/notices.json')
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Fixedheader />
      <Header />
      <Productcategory />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <span className={styles.sidebar__title}>고객센터</span>
          <ul>
            <li>공지사항</li>
            <li>상품 Q&A</li>
            <li>이용안내 FAQ</li>
            <li>1:1 문의</li>
          </ul>
          <div className={styles.contactInfo}>
            <h3>안녕하세요! 에브리펫 고객센터입니다</h3>
            <p>
              평일 10:00 - 18:00
              <br />
              점심 13:00 - 14:00
              <br />
              주문 콜센터 휴무
            </p>
            <h3>1611 - 1188</h3>
          </div>
        </aside>
        <main className={styles.content}>
          <h2>공지사항</h2>
          <div className={styles.searchBar}>
            <select>
              <option>전체</option>
              <option>공지사항</option>
              <option>상품 Q&A</option>
              <option>이용안내 FAQ</option>
            </select>
            <input type='text' placeholder='검색어를 입력해주세요' />
            <button>검색</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={notice.id}>
                  <td className={index === 0 ? styles.notice : ''}>
                    {index === 0 ? '공지 ' + notice.id : notice.id}
                  </td>
                  <td>{notice.title}</td>
                  <td>{notice.author}</td>
                  <td>{notice.date}</td>
                  <td>{notice.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default CustomerService;
