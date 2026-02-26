<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { overflow-x: hidden; }
        .sidebar {
            height: 100vh;
            background: #212529;
        }
        .sidebar a {
            color: white;
            display: block;
            padding: 12px;
            text-decoration: none;
        }
        .sidebar a:hover {
            background: #343a40;
        }
        .content {
            padding: 30px;
        }
    </style>
</head>
<body>

<div class="row g-0">

    <!-- Sidebar -->
    <div class="col-md-2 sidebar">
        <h4 class="text-white text-center mt-3">SportsFest</h4>
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/create-event">Create Event</a>
        <a href="/admin/events">Manage Events</a>
        <a href="/logout">Logout</a>
    </div>

    <!-- Content -->
    <div class="col-md-10 content">
        <h2>Welcome Admin</h2>
        <hr>

        <div class="row mt-4">
            <div class="col-md-4">
                <div class="card shadow">
                    <div class="card-body text-center">
                        <h5>Total Events</h5>
                        <h3>${totalEvents}</h3>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

</body>
</html>