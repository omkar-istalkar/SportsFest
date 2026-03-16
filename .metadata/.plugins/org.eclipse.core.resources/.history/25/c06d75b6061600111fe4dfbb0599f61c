<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Preview Event</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">

    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <small>Deadline: ${event.deadline}</small>
        </div>

        <div class="card-body">

            <form>

                <c:forEach var="field" items="${fields}">

                    <div class="form-group">

                        <label>
                            ${field.label}
                            <c:if test="${field.required}">
                                <span style="color:red">*</span>
                            </c:if>
                        </label>

                        <!-- TEXT -->
                        <c:if test="${field.fieldType == 'text'}">
                            <input type="text" class="form-control"
                                   <c:if test="${field.required}">required</c:if>>
                        </c:if>

                        <!-- NUMBER -->
                        <c:if test="${field.fieldType == 'number'}">
                            <input type="number" class="form-control"
                                   <c:if test="${field.required}">required</c:if>>
                        </c:if>

                        <!-- DROPDOWN -->
                        <c:if test="${field.fieldType == 'dropdown'}">
                            <select class="form-control"
                                    <c:if test="${field.required}">required</c:if>>
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
                                           name="${field.id}">
                                    <label class="form-check-label">
                                        ${opt}
                                    </label>
                                </div>
                            </c:forTokens>
                        </c:if>

                    </div>

                </c:forEach>

                <button type="button" class="btn btn-success">
                    Submit (Preview Mode)
                </button>

            </form>

        </div>
    </div>

    <br>
    <a href="/admin/events" class="btn btn-secondary">Back</a>

</div>

</body>
</html>