document.getElementById('save').addEventListener('click', () => {debugger;
  localStorage.setItem('parambola-profile', document.getElementById('profile').value);
  window.close();
});