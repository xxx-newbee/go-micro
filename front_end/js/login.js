const bindLogin = () => {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    usernameError.textContent = '';
    passwordError.textContent = '';

    let isValid = true;

    if (!usernameInput.value.trim()) {
      usernameError.textContent = '请输入用户名';
      usernameError.style.display = 'block';
      isValid = false;
    }

    if (!passwordInput.value) {
      passwordError.textContent = '请输入密码';
      passwordError.style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    const captchaInput = document.getElementById('captcha');
    const captchaIdInput = document.getElementById('captchaId');

    fetch('http://120.79.237.74:8888/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value,
        captcha_id: captchaIdInput.value,
        captcha_code: captchaInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          alert('登录成功！');
          localStorage.setItem('token', data.data?.token);
        } else {
          alert(data.msg || '登录失败，请重试。');
          loadCaptcha();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('登录时出现错误，请稍后重试。');
        loadCaptcha();
      });
  });

  document.getElementById('captchaImage').addEventListener('click', loadCaptcha);
  loadCaptcha();
};

window.addEventListener('DOMContentLoaded', bindLogin);
