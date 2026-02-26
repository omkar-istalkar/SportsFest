<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Field</title>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-header bg-warning text-white">
            <h4>Edit Form Field</h4>
        </div>

        <div class="card-body">

            <form action="/admin/update-field" method="post">

                <!-- Hidden IDs -->
                <input type="hidden" name="id" value="${field.id}">
                <input type="hidden" name="event.id" value="${field.event.id}">

                <!-- Label -->
                <div class="mb-3">
                    <label class="form-label">Field Label</label>
                    <input type="text" name="label" class="form-control"
                           value="${field.label}" required>
                </div>

                <!-- Field Type -->
                <div class="mb-3">
                    <label class="form-label">Field Type</label>
                    <select name="fieldType" class="form-select">
                        <option value="text" ${field.fieldType=='text'?'selected':''}>Text</option>
                        <option value="number" ${field.fieldType=='number'?'selected':''}>Number</option>
                        <option value="dropdown" ${field.fieldType=='dropdown'?'selected':''}>Dropdown</option>
                        <option value="radio" ${field.fieldType=='radio'?'selected':''}>Radio</option>
                    </select>
                </div>

                <!-- Options -->
                <div class="mb-3">
                    <label class="form-label">Options (Comma separated)</label>
                    <input type="text" name="options" class="form-control"
                           value="${field.options}">
                </div>

                <!-- Required -->
                <div class="form-check mb-3">
                    <input type="checkbox" name="required" class="form-check-input"
                           ${field.required ? 'checked' : ''}>
                    <label class="form-check-label">Required</label>
                </div>

                <button type="submit" class="btn btn-success">
                    Update Field
                </button>

                <a href="/admin/fields/${field.event.id}" class="btn btn-secondary">
                    Back
                </a>

            </form>

        </div>
    </div>
</div>

</body>
</html>