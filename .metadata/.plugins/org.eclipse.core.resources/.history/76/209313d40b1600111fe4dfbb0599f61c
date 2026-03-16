<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>SportsFest Admin Login</title>
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
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="col-md-4">
        <div class="card shadow-lg">
            <div class="card-body">
                <h3 class="text-center mb-4">SportsFest Admin</h3>

                <c:if test="${param.error != null}">
                    <div class="alert alert-danger">
                        Invalid username or password
                    </div>
                </c:if>

                <form action="/login" method="post">
                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="text" name="userName" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-dark w-100">Login</button>
                </form>

            </div>
        </div>
    </div>
</div>

</body>
</html>