<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Registration Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="container mt-5">

<h3 class="mb-4">Registration Details</h3>

<div class="card shadow">
<div class="card-body">

<p><b>Registration ID:</b> ${registration.registrationId}</p>
<p><b>Event:</b> ${registration.event.name}</p>
<p><b>Status:</b> ${registration.status}</p>
<p><b>Registered At:</b> ${registration.registeredAt}</p>

<hr>

<h5>Submitted Details</h5>

<c:forEach var="entry" items="${dynamicData}">
    <p>
        <b>${entry.key}:</b> ${entry.value}
    </p>
</c:forEach>

</div>
</div>

</body>
</html>