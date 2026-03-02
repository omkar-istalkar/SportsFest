<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="fade-in">

    <h3 class="mb-3">Registrations</h3>

    <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">

            <thead class="table-dark">
            <tr>
                <th>ID</th>

                <!-- Dynamic Field Headers -->
                <c:forEach var="field" items="${fields}">
                    <th>${field.label}</th>
                </c:forEach>

                <th>Status</th>
                <th width="180">Actions</th>
            </tr>
            </thead>

            <tbody>
            <c:forEach var="reg" items="${registrations}" varStatus="status">

                <tr>
                    <td>REG-${reg.id}</td>

                    <!-- Dynamic Field Values -->
                    <c:forEach var="field" items="${fields}">
                        <td>
                            ${dynamicDataList[status.index][field.id]}
                        </td>
                    </c:forEach>

                    <td>
                        <span class="badge 
                            ${reg.status == 'PENDING' ? 'bg-warning text-dark' :
                              reg.status == 'APPROVED' ? 'bg-success' :
                              'bg-danger'}">
                            ${reg.status}
                        </span>
                    </td>

                    <td>

                        <c:if test="${reg.status == 'PENDING'}">
                            <button class="btn btn-sm btn-success"
                                    onclick="approveReg(${reg.id})">
                                Approve
                            </button>

                            <button class="btn btn-sm btn-danger"
                                    onclick="rejectReg(${reg.id})">
                                Reject
                            </button>
                        </c:if>

                        <c:if test="${reg.status != 'PENDING'}">
                            <button class="btn btn-sm btn-outline-secondary"
                                    onclick="openModal('/admin/view-registration/${reg.id}',
                                                       'Registration Details')">
                                View
                            </button>
                        </c:if>

                    </td>

                </tr>

            </c:forEach>
            </tbody>

        </table>
    </div>

</div>

<script>

	function approveReg(id) {
	    $.post('/admin/approve-registration/' + id, function() {
	        loadPage('/admin/registrations');
	    }).fail(function() {
	        alert("Error approving registration");
	    });
	}

	function rejectReg(id) {
	    $.post('/admin/reject-registration/' + id, function() {
	        loadPage('/admin/registrations');
	    }).fail(function() {
	        alert("Error rejecting registration");
	    });
	}

</script>