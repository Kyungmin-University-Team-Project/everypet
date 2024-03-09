<%--
  Created by IntelliJ IDEA.
  User: yongho
  Date: 2/16/24
  Time: 7:13 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>로그인</title>
</head>
<body>

    <form action="/signin" method="post">
        <div class="input-container">
            <input type="text" id="member_id" name="member_id" required>
            <label for="member_id">아이디</label>
        </div>

        <div class="input-container">
            <input type="password" id="member_pwd" name="member_pwd" required>
            <label for="member_pwd">비밀번호</label>
        </div>
        <button type="submit" class="submit-btn">제출</button>
        <sec:csrfInput/>
    </form>

</body>
</html>
