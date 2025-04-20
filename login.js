

        // Get DOM elements
        const loginTab = document.getElementById('login-tab');
        const signupTab = document.getElementById('signup-tab');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const formsContainer = document.querySelector('.forms-container');
        
        // Adjust height of forms container initially
        adjustFormsContainerHeight();
        
        // Tab switching functionality
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            
            loginForm.classList.remove('inactive');
            signupForm.classList.remove('active');
            
            setTimeout(() => {
                adjustFormsContainerHeight();
            }, 50);
        });
        
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            
            loginForm.classList.add('inactive');
            signupForm.classList.add('active');
            
            setTimeout(() => {
                adjustFormsContainerHeight();
            }, 50);
        });
        
        // Function to adjust forms container height based on active form
        function adjustFormsContainerHeight() {
            const activeForm = signupForm.classList.contains('active') ? signupForm : loginForm;
            formsContainer.style.height = activeForm.offsetHeight + 'px';
        }
        
        // Adjust height when window resizes
        window.addEventListener('resize', adjustFormsContainerHeight);
        
        // Form validation
        
        // Login form validation
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            const emailError = document.getElementById('login-email-error');
            const passwordError = document.getElementById('login-password-error');
            const message = document.getElementById('login-message');
            
            // Reset error messages
            emailError.style.display = 'none';
            passwordError.style.display = 'none';
            message.style.display = 'none';
            
            // Email validation
            if (!validateEmail(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Password validation
            if (password.value.length < 6) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate login success (would normally send to server)
                message.textContent = 'Login successful! Redirecting...';
                message.className = 'form-message success-message';
                message.style.display = 'block';
                
                // Adjust container height for message
                setTimeout(adjustFormsContainerHeight, 10);
                
                // Simulate redirect after login
                setTimeout(() => {
                    alert('Login successful with email: ' + email.value);
                    // In a real app, you would redirect to dashboard/home
                    // window.location.href = 'index.html';
                }, 1500);
            } else {
                message.textContent = 'Please correct the errors above.';
                message.className = 'form-message error-form-message';
                message.style.display = 'block';
                
                // Adjust container height for message
                setTimeout(adjustFormsContainerHeight, 10);
            }
        });
        
        // Signup form validation
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('signup-name');
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('signup-confirm-password');
            
            const nameError = document.getElementById('signup-name-error');
            const emailError = document.getElementById('signup-email-error');
            const passwordError = document.getElementById('signup-password-error');
            const confirmError = document.getElementById('signup-confirm-password-error');
            const message = document.getElementById('signup-message');
            
            // Reset error messages
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            passwordError.style.display = 'none';
            confirmError.style.display = 'none';
            message.style.display = 'none';
            
            // Name validation
            if (name.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Password validation
            if (password.value.length < 6) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            // Confirm password
            if (password.value !== confirmPassword.value) {
                confirmError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate signup success (would normally send to server)
                message.textContent = 'Account created successfully! Redirecting...';
                message.className = 'form-message success-message';
                message.style.display = 'block';
                
                // Adjust container height for message
                setTimeout(adjustFormsContainerHeight, 10);
                
                // Simulate redirect after signup
                setTimeout(() => {
                    alert('Account created for: ' + name.value + ' (' + email.value + ')');
                    // In a real app, you would redirect to dashboard/home
                    // window.location.href = 'index.html';
                    
                    // Or switch to login tab
                    loginTab.click();
                }, 1500);
            } else {
                message.textContent = 'Please correct the errors above.';
                message.className = 'form-message error-form-message';
                message.style.display = 'block';
                
                // Adjust container height for message
                setTimeout(adjustFormsContainerHeight, 10);
            }
        });
        
        // Email validation helper function
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Real-time validation
        const allInputs = document.querySelectorAll('.form-group input');
        allInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
                setTimeout(adjustFormsContainerHeight, 10);
            });
            
            input.addEventListener('input', function() {
                const errorElement = this.nextElementSibling;
                if (errorElement.classList.contains('error-message')) {
                    errorElement.style.display = 'none';
                    setTimeout(adjustFormsContainerHeight, 10);
                }
            });
        });
        
        function validateInput(input) {
            const id = input.id;
            const value = input.value;
            const errorElement = input.nextElementSibling;
            
            switch(id) {
                case 'login-email':
                case 'signup-email':
                    if (!validateEmail(value)) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
                    
                case 'login-password':
                case 'signup-password':
                    if (value.length < 6) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
                    
                case 'signup-name':
                    if (value.trim() === '') {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
                    
                case 'signup-confirm-password':
                    const password = document.getElementById('signup-password').value;
                    if (value !== password) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                    break;
            }
        }
    