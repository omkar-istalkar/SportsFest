<!DOCTYPE html>
<html>
<head>
    <title>Add Form Field</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
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
</head>
<body>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <span class="navbar-brand">Add Form Field</span>
        <a href="/admin/events" class="btn btn-outline-light btn-sm">Back</a>
    </div>
</nav>

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">

            <form action="/admin/save-field/${eventId}" method="post">

                <div class="mb-3">
                    <label class="form-label">Field Label</label>
                    <input type="text" name="label" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Field Type</label>
                    <select name="fieldType" class="form-select">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Options (Comma separated)</label>
                    <input type="text" name="options" class="form-control">
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox" name="required" class="form-check-input">
                    <label class="form-check-label">Required</label>
                </div>

                <button type="submit" class="btn btn-primary">Save Field</button>

            </form>

        </div>
    </div>
</div>

</body>
</html>