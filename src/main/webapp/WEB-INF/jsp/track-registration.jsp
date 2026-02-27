<html>
<head>
    <title>Track Registration</title>
</head>
<body>
    <h2>Track Your Registration</h2>

    <form action="/track" method="post">
        Registration ID:
        <input type="text" name="registrationId" required>
        <button type="submit">Check Status</button>
    </form>

    <c:if test="${error != null}">
        <p style="color:red;">${error}</p>
    </c:if>
</body>
</html>