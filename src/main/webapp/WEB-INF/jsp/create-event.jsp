<!DOCTYPE html>
<html>
<head>
    <title>Create Event</title>
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
        <span class="navbar-brand">Create Event</span>
        <a href="/admin/dashboard" class="btn btn-outline-light btn-sm">Dashboard</a>
    </div>
</nav>

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">

            <form action="/admin/save-event" method="post">

                <div class="mb-3">
                    <label class="form-label">Event Name</label>
                    <input type="text" name="name" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" required></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Deadline</label>
                    <input type="date" name="deadline" class="form-control">
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox" name="active" class="form-check-input">
                    <label class="form-check-label">Active</label>
                </div>

                <button type="submit" class="btn btn-primary">Save Event</button>

            </form>

        </div>
    </div>
</div>

</body>
</html>