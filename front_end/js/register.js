const bindRegister = () => {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('regUsername');
    const nickname = document.getElementById('regNickname');
    const referral = document.getElementById('regReferral');
    const wallet = document.getElementById('regWallet');
    // const email = document.getElementById('regEmail');
    const password = document.getElementById('regPassword');
    const confirm = document.getElementById('regConfirm');
    const captcha = document.getElementById('captcha');
    const captchaId = document.getElementById('captchaId');

    const usernameError = document.getElementById('username-error');
    const nicknameError = document.getElementById('nickname-error');
    const referralError = document.getElementById('referral-error');
    const walletError = document.getElementById('wallet-error');
    // const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');
    const captchaError = document.getElementById('captcha-error');

    [
      usernameError,
      nicknameError,
      referralError,
      walletError,
    //   emailError,
      passwordError,
      confirmError,
      captchaError,
    ].forEach((el) => {
      el.style.display = 'none';
      el.textContent = '';
    });

    let isValid = true;

    if (!username.value.trim()) {
      usernameError.textContent = '请输入用户名';
      usernameError.style.display = 'block';
      isValid = false;
    }

    if (!nickname.value.trim()) {
      nicknameError.textContent = '请输入昵称';
      nicknameError.style.display = 'block';
      isValid = false;
    }

    if (!referral.value.trim()) {
      referralError.textContent = '请输入推荐码';
      referralError.style.display = 'block';
      isValid = false;
    }

    if (!wallet.value.trim()) {
      walletError.textContent = '请输入钱包地址';
      walletError.style.display = 'block';
      isValid = false;
    }

    // if (!email.value.trim()) {
    //   emailError.textContent = '请输入邮箱';
    //   emailError.style.display = 'block';
    //   isValid = false;
    // }

    if (!password.value) {
      passwordError.textContent = '请输入密码';
      passwordError.style.display = 'block';
      isValid = false;
    }

    if (!confirm.value) {
      confirmError.textContent = '请确认密码';
      confirmError.style.display = 'block';
      isValid = false;
    }

    if (password.value && confirm.value && password.value !== confirm.value) {
      confirmError.textContent = '两次密码不一致';
      confirmError.style.display = 'block';
      isValid = false;
    }

    if (!captcha.value.trim()) {
      captchaError.textContent = '请输入验证码';
      captchaError.style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    fetch('http://120.79.237.74:8888/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        nickname: nickname.value,
        referral_code: referral.value,
        wallet_addr: wallet.value,
        // email: email.value,
        password: password.value,
        captcha_id: captchaId.value,
        captcha_code: captcha.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code === 200) {
            console.log('注册成功', data);
            alert('注册成功，请登录！');
            window.location.href = 'login.html';
        } else {
            alert(data.msg || '注册失败，请重试。');
            loadCaptcha();
        }
      })
      .catch((err) => {
        console.error('注册失败', err);
        alert('注册时出现错误，请稍后重试。');
        loadCaptcha();
      });
  });

  document.getElementById('captchaImage').addEventListener('click', loadCaptcha);
  loadCaptcha();
};

window.addEventListener('DOMContentLoaded', bindRegister);
