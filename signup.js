document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("signupMessage").style.color = "red";
        document.getElementById("signupMessage").innerText = "Passwords do not match!";
        return;
    }

    const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, password })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById("signupMessage").style.color = "green";
        document.getElementById("signupMessage").innerText = "Signup successful!";
        setTimeout(() => {
            window.location.href = "login.html"; // Go to login after signup
        }, 1000);
    } else {
        document.getElementById("signupMessage").style.color = "red";
        document.getElementById("signupMessage").innerText = result.message;
    }
});
