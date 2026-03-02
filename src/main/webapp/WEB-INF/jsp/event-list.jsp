<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="fade-in">

    <div class="d-flex justify-content-between mb-3">
        <h5 class="mb-0">All Events</h5>
    </div>

    <div class="table-responsive">
        <table class="table table-hover align-middle">
            <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Deadline</th>
                <th>Status</th>
                <th width="420">Actions</th>
            </tr>
            </thead>

            <tbody>
            <c:forEach var="event" items="${events}">
                <tr>
                    <td>${event.id}</td>
                    <td>${event.name}</td>
                    <td>${event.deadline}</td>

                    <!-- STATUS BADGE -->
                    <td>
                        <span class="badge ${event.active ? 'bg-success' : 'bg-secondary'}"
                              id="status-badge-${event.id}">
                            ${event.active ? 'Active' : 'Inactive'}
                        </span>
                    </td>

                    <td>

                        <!-- 🔥 MODERN TOGGLE SWITCH -->
                        <div class="form-check form-switch d-inline-block me-2">
                            <input class="form-check-input"
                                   type="checkbox"
                                   ${event.active ? 'checked' : ''}
                                   onchange="toggleEvent(${event.id})">
                        </div>

                        <!-- Fields -->
                        <button class="btn btn-sm btn-info"
                                onclick="openModal('/admin/fields/${event.id}',
                                                   'Fields - ${event.name}')">
                            Fields
                        </button>

                        <!-- Edit -->
                        <button class="btn btn-sm btn-warning"
                                onclick="openModal('/admin/edit-event/${event.id}',
                                                   'Edit Event')">
                            Edit
                        </button>

                        <!-- Delete -->
                        <a href="/admin/delete-event/${event.id}"
                           class="btn btn-sm btn-danger"
                           onclick="return confirm('Are you sure?')">
                            Delete
                        </a>

                        <!-- Preview -->
                        <button class="btn btn-sm btn-primary"
                                onclick="openModal('/admin/preview/${event.id}',
                                                   'Preview - ${event.name}')">
                            Preview
                        </button>

                        <!-- Responses -->
                        <button class="btn btn-sm btn-dark"
                                onclick="openModal('/admin/event-responses/${event.id}',
                                                   'Registrations - ${event.name}')">
                            Responses
                        </button>

                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
	
	<div class="d-flex justify-content-between mb-3">
	    <button class="btn btn-primary btn-sm"
	            onclick="openModal('/admin/create-event','Create Event')">
	        + Create Event
	    </button>
	</div>

</div>

<style>
.fade-in {
    animation: fadeIn 0.4s ease-in;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>

<script>
function toggleEvent(id) {

    $.get('/admin/toggle-event/' + id, function () {

        // Reload only events table (no full page reload)
        loadPage('/admin/events');

    }).fail(function () {
        alert("Something went wrong while toggling event.");
    });
}
</script>