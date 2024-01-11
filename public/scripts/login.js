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


document.addEventListener('DOMContentLoaded', function () {
  const errorMessageElement = document.getElementById('error-message');

  // Check if there's an error message in the DOM
  if (errorMessageElement.innerText.trim() !== '') {
    // If there is, fetch and display the error
    alert(`Login failed:`);
  }
});

 
