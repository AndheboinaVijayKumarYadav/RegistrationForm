// elements stored in variables
const formEl = document.getElementById('form'),
      emailEl = document.getElementById('email'),
      userNameEl = document.getElementById('userName'),
      passwordEl = document.getElementById('password'),
      confirmPasswordEl = document.getElementById('confirmPassword');
      

// utility functions functions

// return true if value is not empty
const isRequired = (value) => value === ''? false: true;

// checking length of the value in range max and min
const isBetween = length => length <min || length > max ? false: true;

// checking if email is valid or not
const isEmailValid = (email) => {
    const re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};

// checking whether the password is strong
const isPasswordSecure = (password) => {
    const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    return re.test(password);
}

//show error function
const showError = (input,message) => {
    // get parent element from input field
    let formFieldEl = input.parentElement;

    // making sure the success is remove and then error class is added
    formFieldEl.classList.remove('success');
    formFieldEl.classList.add('error');
    // adding text to small element 
    const errorEl = formFieldEl.querySelector('small');
    errorEl.textContent = message;
}

// show success indicator
const showSuccess = (input) => {
    // get parent element from input field
    let formFieldEl = input.parentElement;

    // making sure that the error class is removed and success class is added
    formFieldEl.classList.remove('error');
    formFieldEl.classList.add('success');

    // emptying  text to small element 
    const errorEl = formFieldEl.querySelector('small');
    errorEl.textContent = " ";
}

// checking username
const checkUserName = () => {
    let valid = false 
        min = 3,
        max = 25;
    
    // getting the value of username
    let username = userNameEl.value.trim();
    
    if(!isRequired(username)){
        showError(userNameEl,"Username cannot be empty");
    }
    else if(!isBetween(username.length,3,25)){
        showError(userNameEl,'Username must be between '+min+' - '+max +' characters');
    }
    else{
        showSuccess(userNameEl);
        valid = true;
    }

    return valid;
}

// checking email
const checkEmail = () => {
    let valid = false 
        min = 3,
        max = 25;
    const email = emailEl.value.trim();

    if(!isRequired(email)){
        showError(emailEl,'Email Cannot be empty')
    }
    else if(!isEmailValid(email)){
        showError(emailEl,'Invalid Email Address');
    }
    else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

// checking password
const checkPassword = () => {
    let valid =false;

    const password = passwordEl.value.trim();

    if(!isRequired(password)){
        showError(passwordEl,'Password cannot be empty');
    }
    else if(!isPasswordSecure(password)){
        showError(passwordEl,'Password should contain atleast one uppercase letter,one lowercase letter,one special character and number at least length of 8 characters');
    }
    else{
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}

// confirming password
const confirmPassword = () => {
    let valid =false;

    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if(!isRequired(confirmPassword)){
        showError(confirmPasswordEl,'confirm password cannot be empty');
    }
    else if(password !== confirmPassword){
        showError(confirmPasswordEl,'confirm password does not match');
    }
    else{
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
}



// event listener
formEl.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log(formEl);

    const isValidUserName = checkUserName(),
          isValidEmail = checkEmail(),
          isValidPassword = checkPassword(),
          isValidConfirmPassword = confirmPassword();

    const isValidForm = isValidUserName && isValidEmail && isValidConfirmPassword && isValidPassword ;

    if(isValidForm){
        alert('form is successfully submitted to server');
    }
})