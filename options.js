document.getElementById('save').addEventListener('click', () => {
  localStorage.setItem('parambola-profile', document.getElementById('profile').value);
  window.close();
});