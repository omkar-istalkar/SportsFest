<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>SportsFest</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
            font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
            border-radius: 18px;
            border: none;
        }

        .brand-title {
            font-weight: 600;
        }

        .public-link {
            font-size: 14px;
        }

        .btn-primary-custom {
            background: #2563eb;
            border: none;
        }

        .btn-primary-custom:hover {
            background: #1d4ed8;
        }
    </style>
</head>

<body>

<div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="col-md-4">

        <div class="card shadow-lg login-card">
            <div class="card-body p-4">

                <h3 class="text-center brand-title mb-2">SportsFest</h3>
                <p class="text-center text-muted mb-4">Admin Panel Login</p>

                <c:if test="${param.error != null}">
                    <div class="alert alert-danger">
                        Invalid username or password
                    </div>
                </c:if>

                <!-- ADMIN LOGIN -->
                <form action="/login" method="post">

                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="text" name="userName" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-primary-custom w-100 mb-3">
                        Login
                    </button>

                </form>

                <hr>

                <!-- PUBLIC SECTION -->
                <div class="text-center">

                    <p class="text-muted public-link mb-2">
                        Are you a participant?
                    </p>

                    <a href="/events" class="btn btn-outline-primary w-100 mb-2">
                        Browse Active Events
                    </a>

                    <a href="/check-status" class="btn btn-outline-secondary w-100">
                        Check Registration Status
                    </a>

                </div>

            </div>
        </div>

    </div>
</div>

</body>
</html>