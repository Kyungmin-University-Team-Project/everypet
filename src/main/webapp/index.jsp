<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div>
        <form action="/signin" method="post">
            <label>
                아이디
                <input type='text' id='username' name='username'/>
            </label>
            <label htmlFor='password'>
                비밀번호
                <input type='password' id='password' name='password'/>
            </label>
            <button type='button'>제출</button>
        </form>
    </div>
</body>
</html>