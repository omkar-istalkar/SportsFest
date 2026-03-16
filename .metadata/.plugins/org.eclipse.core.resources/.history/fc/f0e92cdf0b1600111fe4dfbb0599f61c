<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Events</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">

<h2>Available Events</h2>

<table class="table table-bordered">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Deadline</th>
        <th>Action</th>
    </tr>

    <c:forEach var="event" items="${events}">
        <tr>
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.deadline}</td>
            <td>
                <a href="/register/${event.id}" class="btn btn-primary">
                    Register
                </a>
            </td>
        </tr>
    </c:forEach>
</table>

<a href="/check-status" class="btn btn-secondary">Check Registration Status</a>

</body>
</html>