<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Event Fields</title>
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

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">

            <h4>Fields for Event: ${event.name}</h4>
            <hr>

            <a href="/admin/add-field/${event.id}" class="btn btn-primary mb-3">Add New Field</a>

            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Label</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Options</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="field" items="${fields}">
                        <tr>
                            <td>${field.id}</td>
                            <td>${field.label}</td>
                            <td>${field.fieldType}</td>
                            <td>
                                <c:if test="${field.required}">
                                    <span class="badge bg-success">Yes</span>
                                </c:if>
                                <c:if test="${!field.required}">
                                    <span class="badge bg-secondary">No</span>
                                </c:if>
                            </td>
                            <td>${field.options}</td>
							<td>
							    <a href="/admin/edit-field/${field.id}" class="btn btn-sm btn-warning">Edit</a>
							    <a href="/admin/delete-field/${field.id}" class="btn btn-sm btn-danger"
							       onclick="return confirm('Are you sure?')">Delete</a>
							</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>

            <a href="/admin/events" class="btn btn-secondary">Back</a>

        </div>
    </div>
</div>

</body>
</html>