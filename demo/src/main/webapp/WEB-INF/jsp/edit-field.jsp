<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="fade-in">

    <form action="/admin/update-field" method="post">

        <!-- Hidden IDs -->
        <input type="hidden" name="id" value="${field.id}">
        <input type="hidden" name="event.id" value="${field.event.id}">

        <!-- Field Label -->
        <div class="mb-3">
            <label class="form-label">Field Label</label>
            <input type="text"
                   name="label"
                   class="form-control"
                   value="${field.label}"
                   required>
        </div>

        <!-- Field Type -->
        <div class="mb-3">
            <label class="form-label">Field Type</label>
            <select name="fieldType" class="form-select" id="fieldTypeEdit">
                <option value="text"
                    <c:if test="${field.fieldType == 'text'}">selected</c:if>>
                    Text
                </option>

                <option value="number"
                    <c:if test="${field.fieldType == 'number'}">selected</c:if>>
                    Number
                </option>

                <option value="dropdown"
                    <c:if test="${field.fieldType == 'dropdown'}">selected</c:if>>
                    Dropdown
                </option>

                <option value="radio"
                    <c:if test="${field.fieldType == 'radio'}">selected</c:if>>
                    Radio
                </option>
            </select>
        </div>

        <!-- Options -->
        <div class="mb-3" id="optionsContainerEdit"
             <c:if test="${field.fieldType != 'dropdown' && field.fieldType != 'radio'}">
                 style="display:none;"
             </c:if>>
            <label class="form-label">Options (Comma separated)</label>
            <input type="text"
                   name="options"
                   class="form-control"
                   value="${field.options}">
            <small class="text-muted">
                Required for Dropdown and Radio fields
            </small>
        </div>

        <!-- Required -->
        <div class="form-check mb-3">
            <input type="checkbox"
                   name="required"
                   class="form-check-input"
                   id="requiredCheckEdit"
                   <c:if test="${field.required}">checked</c:if>>
            <label class="form-check-label" for="requiredCheckEdit">
                Required
            </label>
        </div>

        <!-- Buttons -->
        <div class="d-flex justify-content-end gap-2">
            <button type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit" class="btn btn-success">
                Update Field
            </button>
        </div>

    </form>

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
    document.addEventListener("change", function(e) {
        if (e.target && e.target.id === "fieldTypeEdit") {
            const optionsBox = document.getElementById("optionsContainerEdit");
            if (e.target.value === "dropdown" || e.target.value === "radio") {
                optionsBox.style.display = "block";
            } else {
                optionsBox.style.display = "none";
            }
        }
    });
</script>