const loadCaptcha = () => {
  const img = document.getElementById('captchaImage');
  const idInput = document.getElementById('captchaId');

  img.classList.remove('captcha-loading-fail');

  fetch('http://120.79.237.74:8888/captcha', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.data) {
        img.src = data.data.img_base64;
        idInput.value = data.data.captcha_id;
        img.classList.remove('captcha-loading-fail');
      } else {
        throw new Error('验证码数据为空');
      }
    })
    .catch((err) => {
      console.error('获取验证码失败', err);
      img.src = '';
      img.classList.add('captcha-loading-fail');
    });
};