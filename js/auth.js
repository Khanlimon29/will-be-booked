function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidLogin(login) {
    const loginRegex = /^[a-zA-Z0-9_-]+$/;
    return loginRegex.test(login);
}

document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailOrLogin = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value.trim();
    let isValid = true;

    document.getElementById('signinEmailError').style.display = 'none';
    document.getElementById('signinPasswordError').style.display = 'none';

    if (emailOrLogin === '') {
        document.getElementById('signinEmailError').style.display = 'inline';
        document.getElementById('signinEmailError').textContent = 'Пожалуйста, введите email или логин';
        isValid = false;
    } else if (emailOrLogin.includes('@')) {
        if (!isValidEmail(emailOrLogin)) {
            document.getElementById('signinEmailError').style.display = 'inline';
            document.getElementById('signinEmailError').textContent = 'Некорректный email (необходимо example@domain.com)';
            isValid = false;
        }
    } else {
        if (!isValidLogin(emailOrLogin)) {
            document.getElementById('signinEmailError').style.display = 'inline';
            document.getElementById('signinEmailError').textContent = 'Логин может содержать только латинские буквы, цифры, нижнее подчеркивание, дефис';
            isValid = false;
        }
    }

    if (password === '') {
        document.getElementById('signinPasswordError').style.display = 'inline';
        isValid = false;
    }

    if (isValid) {
        alert('Добро пожаловать! ' + emailOrLogin);
        document.getElementById('signinForm').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    let isValid = true;

    document.getElementById('signupEmailError').style.display = 'none';
    document.getElementById('signupPasswordError').style.display = 'none';
    document.getElementById('signupConfirmPasswordError').style.display = 'none';

    if (email === '' || !isValidEmail(email)) {
        document.getElementById('signupEmailError').style.display = 'inline';
        document.getElementById('signupEmailError').textContent = 'Пожалуйста, введите корректный email (example@domain.com)';
        isValid = false;
    }

    if (password.length < 6) {
        document.getElementById('signupPasswordError').style.display = 'inline';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('signupConfirmPasswordError').style.display = 'inline';
        isValid = false;
    }

    if (isValid) {
        alert('Аккаунт успешно создан! ' + email);
        document.getElementById('signupForm').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide();
        document.getElementById('signin-tab').click();
    }
});
