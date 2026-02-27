<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>All Events</title>
	<style>
	.card {
	    transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.card:hover {
	    transform: translateY(-5px);
	    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
	}

	.fade-in {
	    animation: fadeIn 0.6s ease-in;
	}

	@keyframes fadeIn {
	    from { opacity: 0; transform: translateY(15px); }
	    to { opacity: 1; transform: translateY(0); }
	}
	</style>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <span class="navbar-brand">Manage Events</span>
        <a href="/admin/dashboard" class="btn btn-outline-light btn-sm">Dashboard</a>
    </div>
</nav>

<div class="container mt-5">

    <div class="card shadow">
        <div class="card-body">

            <a href="/admin/create-event" class="btn btn-primary mb-3">Create New Event</a>

            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Active</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                <c:forEach var="event" items="${events}">
                    <tr>
                        <td>${event.id}</td>
                        <td>${event.name}</td>
                        <td>${event.description}</td>
                        <td>${event.deadline}</td>
                        <td>
                            <c:choose>
                                <c:when test="${event.active}">
                                    <span class="badge bg-success">Active</span>
                                </c:when>
                                <c:otherwise>
                                    <span class="badge bg-secondary">Inactive</span>
                                </c:otherwise>
                            </c:choose>
							<c:choose>
							    <c:when test="${event.active}">
							        <a href="/admin/toggle-event/${event.id}"
							           class="btn btn-sm btn-warning">
							           Deactivate
							        </a>
							    </c:when>
							    <c:otherwise>
							        <a href="/admin/toggle-event/${event.id}"
							           class="btn btn-sm btn-success">
							           Activate
							        </a>
							    </c:otherwise>
							</c:choose>
                        </td>
                        <td>
							<a href="/admin/fields/${event.id}" class="btn btn-sm btn-info">Show Field</a>	                            
                            <a href="/admin/add-field/${event.id}" class="btn btn-sm btn-info">Add Field</a>
                            <a href="/admin/edit-event/${event.id}" class="btn btn-sm btn-warning">Edit</a>
                            <a href="/admin/delete-event/${event.id}" class="btn btn-sm btn-danger"
                               onclick="return confirm('Are you sure?')">Delete</a>
							<a href="/admin/preview/${event.id}"
							      class="btn btn-sm btn-primary">
							      Preview
							</a>
							<a href="/admin/event-responses/${event.id}" 
							   class="btn btn-sm btn-dark">
							   View Responses
							</a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>

            </table>

        </div>
    </div>

</div>

</body>
</html>