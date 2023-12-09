const inputPass = document.getElementById('pass');
const icon = document.querySelector('div i');

// change th icon (show and hidding the password)
icon.addEventListener('click', () => {
  if (icon.className === 'fas fa-eye-slash') {
    icon.className = 'fas fa-eye';
    inputPass.setAttribute('type', 'text');
  } else {
    icon.className = 'fas fa-eye-slash';
    inputPass.setAttribute('type', 'password');
  }
});
/*
// control errors of password and username
form.addEventListener('submit', (e) => {
  // Prevent the form from submitting if there are any errors
  e.preventDefault();

  // Check if the form is valid
  if (!inputText.value.length >= 4 && !inputPass.value.length >= 8) {
  
    // Display error messages if the form is not valid
    const userInfo = document.getElementById('error-name');
    userInfo.innerHTML = 'Username needs to be 4 characters at least';

    const passInfo = document.getElementById('error-pass');
    passInfo.innerHTML = 'Password needs to have at least 8 characters';
  }
});
*/