// script.js

// Show/hide different screens
setTimeout(() => {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('login').style.display = 'block';
  }, 2000);
  
  function showSignup() {
    hideAll();
    document.getElementById('signup').style.display = 'block';
  }
  
  function showLogin() {
    hideAll();
    document.getElementById('login').style.display = 'block';
  }
  
  function showForgot() {
    hideAll();
    document.getElementById('forgot').style.display = 'block';
  }
  
  function hideAll() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('forgot').style.display = 'none';
  }
  
  // Save users to localStorage
  document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('signupName').value.trim();
    let mobile = document.getElementById('signupMobile').value.trim();
    let password = document.getElementById('signupPassword').value;
    let confirmPassword = document.getElementById('signupConfirmPassword').value;
  
    if (password !== confirmPassword) {
      document.getElementById('signupMessage').innerText = "Passwords do not match!";
      document.getElementById('signupMessage').style.color = "red";
      return;
    }
  
    let users = JSON.parse(localStorage.getItem('users')) || {};
  
    if (users[mobile]) {
      document.getElementById('signupMessage').innerText = "Mobile already registered!";
      document.getElementById('signupMessage').style.color = "red";
      return;
    }
  
    users[mobile] = { name: name, password: password };
    localStorage.setItem('users', JSON.stringify(users));
  
    document.getElementById('signupMessage').innerText = "Signup successful!";
    document.getElementById('signupMessage').style.color = "green";
  
    setTimeout(showLogin, 1500);
  });
  
  // Login users
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let mobile = document.getElementById('loginMobile').value.trim();
    let password = document.getElementById('loginPassword').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || {};
  
    if (users[mobile] && users[mobile].password === password) {
      document.getElementById('loginMessage').innerText = "Login successful!";
      document.getElementById('loginMessage').style.color = "green";
  
      localStorage.setItem('currentUser', mobile);
  
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      document.getElementById('loginMessage').innerText = "Invalid Mobile or Password!";
      document.getElementById('loginMessage').style.color = "red";
    }
  });
  
  // Forgot password
  document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let mobile = document.getElementById('forgotMobile').value.trim();
    let newPassword = document.getElementById('forgotPassword').value;
    let confirmPassword = document.getElementById('forgotConfirmPassword').value;
  
    if (newPassword !== confirmPassword) {
      document.getElementById('forgotMessage').innerText = "Passwords do not match!";
      document.getElementById('forgotMessage').style.color = "red";
      return;
    }
  
    let users = JSON.parse(localStorage.getItem('users')) || {};
  
    if (users[mobile]) {
      users[mobile].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      document.getElementById('forgotMessage').innerText = "Password Reset Successful!";
      document.getElementById('forgotMessage').style.color = "green";
  
      setTimeout(showLogin, 1500);
    } else {
      document.getElementById('forgotMessage').innerText = "Mobile number not registered!";
      document.getElementById('forgotMessage').style.color = "red";
    }
  });
  