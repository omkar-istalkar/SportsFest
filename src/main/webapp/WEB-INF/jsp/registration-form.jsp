<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Register - ${event.name}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container mt-5 mb-5">
<div class="row justify-content-center">
<div class="col-md-7">

<div class="card shadow">
<div class="card-body">

<h3>${event.name}</h3>
<p class="text-muted">${event.description}</p>
<hr>

<form action="/submit-registration" method="post">

<input type="hidden" name="eventId" value="${event.id}" />


<hr>

<!-- 🔥 DYNAMIC FIELDS START HERE -->

<c:forEach var="field" items="${fields}">

    <div class="mb-3">

        <label class="form-label">
            ${field.label}
            <c:if test="${field.required}">
                <span class="text-danger">*</span>
            </c:if>
        </label>

        <!-- TEXT -->
        <c:if test="${field.fieldType == 'text'}">
            <input type="text"
                   name="dynamic_${field.id}"
                   class="form-control"
                   <c:if test="${field.required}">required</c:if>>
        </c:if>

        <!-- NUMBER -->
        <c:if test="${field.fieldType == 'number'}">
            <input type="number"
                   name="dynamic_${field.id}"
                   class="form-control"
                   <c:if test="${field.required}">required</c:if>>
        </c:if>

        <!-- DROPDOWN -->
        <c:if test="${field.fieldType == 'dropdown'}">
            <select name="dynamic_${field.id}"
                    class="form-select"
                    <c:if test="${field.required}">required</c:if>>
                <option value="">Select</option>
                <c:forTokens items="${field.options}" delims="," var="opt">
                    <option value="${opt}">${opt}</option>
                </c:forTokens>
            </select>
        </c:if>

        <!-- RADIO -->
        <c:if test="${field.fieldType == 'radio'}">
            <c:forTokens items="${field.options}" delims="," var="opt">
                <div class="form-check">
                    <input class="form-check-input"
                           type="radio"
                           name="dynamic_${field.id}"
                           value="${opt}"
                           <c:if test="${field.required}">required</c:if>>
                    <label class="form-check-label">${opt}</label>
                </div>
            </c:forTokens>
        </c:if>

    </div>

</c:forEach>

<!-- 🔥 DYNAMIC FIELDS END -->

<button type="submit" class="btn btn-success w-100">
    Submit Registration
</button>

</form>

</div>
</div>
</div>
</div>
</div>

</body>
</html>