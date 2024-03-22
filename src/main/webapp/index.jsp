<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html>
<header>
</header>
<body>
    <div>
        <form action="/signin" method="post">
            <label>
                아이디
                <input type='text' id='member_id' name='member_id'/>
            </label>
            <label htmlFor='member_pwd'>
                비밀번호
                <input type='password' id='member_pwd' name='member_pwd'/>
            </label>
            <button type='submit' className='submit-btn'>제출</button>
        </form>
    </div>
</body>
</html>