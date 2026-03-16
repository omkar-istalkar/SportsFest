<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>SportsFest - Check Status</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
        }

        .glass-card {
            width: 460px;
            border-radius: 20px;
            padding: 35px;
            backdrop-filter: blur(15px);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: fadeSlide 0.6s ease;
        }

        @keyframes fadeSlide {
            from {
                opacity: 0;
                transform: translateY(25px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-control {
            border-radius: 12px;
        }

        .btn-primary {
            border-radius: 12px;
        }

        .status-box {
            margin-top: 20px;
            padding: 20px;
            border-radius: 15px;
            animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .badge-status {
            font-size: 16px;
            padding: 10px 25px;
            border-radius: 30px;
        }

        .footer-link {
            font-size: 14px;
        }

        .icon-circle {
            font-size: 26px;
            margin-bottom: 10px;
        }

        .bg-pending { background: rgba(255, 193, 7, 0.2); }
        .bg-approved { background: rgba(25, 135, 84, 0.2); }
        .bg-rejected { background: rgba(220, 53, 69, 0.2); }

    </style>
</head>

<body>

<div class="glass-card text-center">

    <h3 class="mb-3">Check Registration Status</h3>
    <p class="text-light small mb-4">
        Enter your Registration ID to view approval status
    </p>

    <!-- FORM -->
    <form action="/check-status" method="post">

        <div class="mb-3">
            <input type="text"
                   name="registrationId"
                   class="form-control form-control-lg"
                   placeholder="Enter Registration ID"
                   required>
        </div>

        <button type="submit" class="btn btn-primary w-100">
            <i class="bi bi-search"></i> Check Status
        </button>

    </form>

    <!-- RESULT -->
    <c:if test="${registration != null}">
        <div class="status-box mt-4
            ${registration.status == 'PENDING' ? 'bg-pending' :
              registration.status == 'APPROVED' ? 'bg-approved' :
              'bg-rejected'}">

            <div class="icon-circle">
                <c:choose>
                    <c:when test="${registration.status == 'PENDING'}">
                        <i class="bi bi-clock text-warning"></i>
                    </c:when>
                    <c:when test="${registration.status == 'APPROVED'}">
                        <i class="bi bi-check-circle text-success"></i>
                    </c:when>
                    <c:otherwise>
                        <i class="bi bi-x-circle text-danger"></i>
                    </c:otherwise>
                </c:choose>
            </div>

            <p class="mb-2">${registration.event.name}</p>

            <span class="badge 
                ${registration.status == 'PENDING' ? 'bg-warning text-dark' :
                  registration.status == 'APPROVED' ? 'bg-success' :
                  'bg-danger'}
                badge-status">

                ${registration.status}
            </span>
			
			<c:if test="${not empty dynamicData}">
			    <div class="mt-4 text-start">

			        <h6 class="mb-3">Submitted Details</h6>

			        <div class="table-responsive">
			            <table class="table table-sm table-bordered text-white">
			                <tbody>

			                <c:forEach var="entry" items="${dynamicData}">
			                    <tr>
			                        <td><strong>${entry.key}</strong></td>
			                        <td>${entry.value}</td>
			                    </tr>
			                </c:forEach>

			                </tbody>
			            </table>
			        </div>

			    </div>
			</c:if>

        </div>
    </c:if>

    <!-- ERROR -->
    <c:if test="${error != null}">
        <div class="alert alert-danger mt-4">
            ${error}
        </div>
    </c:if>

    <div class="mt-4 footer-link">
        <a href="/events" class="text-white text-decoration-none">
            Back to Events
        </a>
    </div>

</div>

</body>
</html>