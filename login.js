document.getElementById("loginForm").addEventListener("submit", async (e) => {

    
    e.preventDefault();

    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById("loginMessage").style.color = "green";
        document.getElementById("loginMessage").innerText = "Login successful!";
        setTimeout(() => {
            window.location.href = "dashboard.html"; // Redirect after login
        }, 1000);
    } else {
        document.getElementById("loginMessage").style.color = "red";
        document.getElementById("loginMessage").innerText = result.message;
    }
});
