<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="fade-in">
    <!-- Fields Table -->
    <div class="table-responsive">
        <table class="table table-hover align-middle">
            <thead class="table-dark">
                <tr>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Options</th>
                    <th width="150">Action</th>
                </tr>
            </thead>

            <tbody>
                <c:forEach var="field" items="${fields}">
                    <tr>
                        <td>${field.label}</td>
                        <td>
                            <span class="badge bg-info text-dark">
                                ${field.fieldType}
                            </span>
                        </td>

                        <td>
                            <span class="badge ${field.required ? 'bg-success' : 'bg-secondary'}">
                                ${field.required ? 'Yes' : 'No'}
                            </span>
                        </td>

                        <td>
                            <c:choose>
                                <c:when test="${not empty field.options}">
                                    ${field.options}
                                </c:when>
                                <c:otherwise>
                                    -
                                </c:otherwise>
                            </c:choose>
                        </td>

                        <td>
                            <button class="btn btn-sm btn-warning"
                                    onclick="openModal('/admin/edit-field/${field.id}',
                                                       'Edit Field')">
                                Edit
                            </button>

                            <a href="/admin/delete-field/${field.id}"
                               class="btn btn-sm btn-danger"
                               onclick="return confirm('Are you sure?')">
                                Delete
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
		<div class="d-flex justify-content-between align-items-center mb-3">

			<button class="btn btn-primary btn-sm"
			        onclick="openModal('/admin/add-field/${event.id}',
			                           'Add Field - ${event.name}')">
			    + Add New Field
			</button>
			
		    <button class="btn btn-sm btn-secondary"
		            onclick="openModal('/admin/events','Select Event')">
		        Back
		    </button>
		</div>
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