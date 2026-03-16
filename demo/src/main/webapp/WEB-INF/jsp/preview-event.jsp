<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="fade-in">

    <!-- Header -->
    <div class="mb-4">
        <h5 class="mb-1">${event.name}</h5>
        <p class="text-muted mb-1">${event.description}</p>
        <small class="text-muted">Deadline: ${event.deadline}</small>
    </div>

    <div class="card shadow-sm border-0">
        <div class="card-body">

            <form>

                <c:forEach var="field" items="${fields}">

                    <div class="mb-3">

                        <label class="form-label fw-semibold">
                            ${field.label}
                            <c:if test="${field.required}">
                                <span class="text-danger">*</span>
                            </c:if>
                        </label>

                        <!-- TEXT -->
                        <c:if test="${field.fieldType == 'text'}">
                            <input type="text"
                                   class="form-control"
                                   <c:if test="${field.required}">required</c:if>>
                        </c:if>

                        <!-- NUMBER -->
                        <c:if test="${field.fieldType == 'number'}">
                            <input type="number"
                                   class="form-control"
                                   <c:if test="${field.required}">required</c:if>>
                        </c:if>

                        <!-- DROPDOWN -->
                        <c:if test="${field.fieldType == 'dropdown'}">
                            <select class="form-select"
                                    <c:if test="${field.required}">required</c:if>>
                                <option value="">Select option</option>
                                <c:forTokens items="${field.options}"
                                             delims=","
                                             var="opt">
                                    <option>${opt}</option>
                                </c:forTokens>
                            </select>
                        </c:if>

                        <!-- RADIO -->
                        <c:if test="${field.fieldType == 'radio'}">
                            <c:forTokens items="${field.options}"
                                         delims=","
                                         var="opt">
                                <div class="form-check">
                                    <input class="form-check-input"
                                           type="radio"
                                           name="field-${field.id}">
                                    <label class="form-check-label">
                                        ${opt}
                                    </label>
                                </div>
                            </c:forTokens>
                        </c:if>

                    </div>

                </c:forEach>

                <div class="d-flex justify-content-end gap-2 mt-3">
                    <button type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal">
                        Close
                    </button>

                    <button type="button"
                            class="btn btn-success">
                        Submit (Preview Mode)
                    </button>
                </div>

            </form>

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