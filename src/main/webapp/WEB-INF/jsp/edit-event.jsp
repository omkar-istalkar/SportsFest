<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Event</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">

            <h3>Edit Event</h3>
            <hr>

            <form action="/admin/update-event" method="post">

                <!-- Hidden ID (VERY IMPORTANT) -->
                <input type="hidden" name="id" value="${event.id}">

                <div class="mb-3">
                    <label class="form-label">Event Name</label>
                    <input type="text"
                           name="name"
                           value="${event.name}"
                           class="form-control"
                           required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea name="description"
                              class="form-control"
                              required>${event.description}</textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Deadline</label>
                    <input type="date"
                           name="deadline"
                           value="${event.deadline}"
                           class="form-control">
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox"
                           name="active"
                           class="form-check-input"
                           <c:if test="${event.active}">checked</c:if>>
                    <label class="form-check-label">Active</label>
                </div>

                <button type="submit" class="btn btn-primary">Update Event</button>
                <a href="/admin/events" class="btn btn-secondary">Cancel</a>

            </form>

        </div>
    </div>
</div>

</body>
</html>