<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Check Registration Status</title>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #1f4037, #99f2c8);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card-custom {
            width: 450px;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
            animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .status-badge {
            font-size: 18px;
            padding: 8px 20px;
            border-radius: 30px;
        }
    </style>
</head>
<body>

<div class="card card-custom text-center">

    <h3 class="mb-4">Check Registration Status</h3>

    <!-- Status Form -->
    <form action="/check-status" method="post">
        <div class="mb-3">
            <input type="number" 
                   name="registrationId" 
                   class="form-control form-control-lg"
                   placeholder="Enter Registration ID"
                   required>
        </div>

        <button type="submit" class="btn btn-primary w-100">
            Check Status
        </button>
    </form>

    <!-- Result Section -->
    <c:if test="${registration != null}">
        <hr>

        <h5 class="mt-3">Registration Details</h5>

        <p><strong>Name:</strong> ${registration.captainName}</p>
        <p><strong>Event:</strong> ${registration.event.name}</p>

        <c:choose>
            <c:when test="${registration.status == 'PENDING'}">
                <span class="badge bg-warning text-dark status-badge">
                    PENDING
                </span>
            </c:when>

            <c:when test="${registration.status == 'APPROVED'}">
                <span class="badge bg-success status-badge">
                    APPROVED
                </span>
            </c:when>

            <c:when test="${registration.status == 'REJECTED'}">
                <span class="badge bg-danger status-badge">
                    REJECTED
                </span>
            </c:when>
        </c:choose>
    </c:if>

    <c:if test="${error != null}">
        <div class="alert alert-danger mt-3">
            ${error}
        </div>
    </c:if>

    <div class="mt-4">
        <a href="/events" class="btn btn-outline-dark btn-sm">Back to Events</a>
    </div>

</div>

</body>
</html>