<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Event Responses</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-4">

    <h2>${event.name} - Registrations</h2>
    <hr>

    <c:if test="${empty registrations}">
        <div class="alert alert-info">
            No registrations yet.
        </div>
    </c:if>

    <c:if test="${not empty registrations}">
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Captain Name</th>
                    <th>Email</th>
                    <th>Team Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="reg" items="${registrations}">
                    <tr>
                        <td>${reg.id}</td>
                        <td>${reg.captainName}</td>
                        <td>${reg.email}</td>
                        <td>${reg.teamName}</td>
                        <td>
                            <span class="badge 
                                ${reg.status == 'PENDING' ? 'bg-warning' :
                                  reg.status == 'APPROVED' ? 'bg-success' :
                                  'bg-danger'}">
                                ${reg.status}
                            </span>
                        </td>
                        <td>
                            <a href="/admin/approve-registration/${reg.id}"
                               class="btn btn-sm btn-success">
                               Approve
                            </a>

                            <a href="/admin/reject-registration/${reg.id}"
                               class="btn btn-sm btn-danger">
                               Reject
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </c:if>

    <a href="/admin/events" class="btn btn-secondary mt-3">
        Back to Events
    </a>

</div>

</body>
</html>