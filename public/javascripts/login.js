document.addEventListener('DOMContentLoaded', function () {
    const background = document.querySelector('.background');
    const loginButton = document.querySelector('button'); document.addEventListener('mousemove', function (e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      background.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });
    loginButton.addEventListener('click', function () {
      loginButton.classList.add('clicked');
      setTimeout(() => {
        loginButton.classList.remove('clicked');
      }, 300);
    });
  });
  