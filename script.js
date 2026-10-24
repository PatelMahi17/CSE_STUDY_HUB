document.addEventListener('DOMContentLoaded', () => {
// Universal Intersection Observer for fade-in animations
 const fadeInElements = document.querySelectorAll('.pre-fade-in');
const observerOptions = {
 root: null, // viewport
 rootMargin: '0px',
 threshold: 0.1 // 10% of element visible
 };
 const observer = new IntersectionObserver((entries, observer) => {
 entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in');
 observer.unobserve(entry.target); // Stop observing once animated
 }
 });
 }, observerOptions);
 fadeInElements.forEach(element => {
 observer.observe(element);
 });
 // Contact Form Validation and Simulated Submission (only runs if the form exists)
 const contactForm = document.getElementById('contactForm');
 if (contactForm) { // Check if the form element exists on the current page
 const nameInput = document.getElementById('name');
 const emailInput = document.getElementById('email');
 const messageInput = document.getElementById('message');
 const nameError = document.getElementById('nameError');
 const emailError = document.getElementById('emailError');
 const messageError = document.getElementById('messageError');
 const formMessage = document.getElementById('formMessage');
 // Function to display error message
 function showError(element, message) {
element.textContent = message;
 element.classList.add('active');
 }
 // Function to clear error message
function clearError(element) {
 element.textContent = '';
element.classList.remove('active');
 }
// Email validation regex (simple but effective)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 // Validate individual fields on blur (when user leaves the field)
 nameInput.addEventListener('blur', () => {
 if (nameInput.value.trim() === '') {
 showError(nameError, 'Name is required.');
 } else {
 clearError(nameError);
 }
});
emailInput.addEventListener('blur', () => {
 if (emailInput.value.trim() === '') {
showError(emailError, 'Email is required.');
 } else if (!emailRegex.test(emailInput.value.trim())) {
 showError(emailError, 'Please enter a valid email address.');
 } else {
clearError(emailError);
 }
 });
 messageInput.addEventListener('blur', () => {
 if (messageInput.value.trim() === '') {
 showError(messageError, 'Message cannot be empty.');
} else if (messageInput.value.trim().length < 10) { // Example: minimum message length
 showError(messageError, 'Message must be at least 10 characters long.');
} else {
 clearError(messageError);
 }
 });
 // Handle form submission
 contactForm.addEventListener('submit', function(event) {
 event.preventDefault(); // Prevent default form submission (important!)
 // Clear previous messages
 formMessage.textContent = '';
 formMessage.classList.remove('success', 'error');
 // Re-validate all fields on submit
 let isValid = true;
 if (nameInput.value.trim() === '') {
 showError(nameError, 'Name is required.');
 isValid = false;
} else {
 clearError(nameError);
 }
 if (emailInput.value.trim() === '') {
 showError(emailError, 'Email is required.');
isValid = false;
 } else if (!emailRegex.test(emailInput.value.trim())) {
 showError(emailError, 'Please enter a valid email address.');
 isValid = false;
 } else {
 clearError(emailError);
}
 if (messageInput.value.trim() === '') {

 showError(messageError, 'Message cannot be empty.');
 isValid = false;
} else if (messageInput.value.trim().length < 10) {
 showError(messageError, 'Message must be at least 10 characters long.');
 isValid = false;
} else {
 clearError(messageError);
 }
if (isValid) {
 // --- SIMULATED SUBMISSION: Data is logged to console, but NOT sent to a server ---
 console.log('Form data collected (but not sent to a backend):');
 console.log('Name:', nameInput.value.trim());
 console.log('Email:', emailInput.value.trim());
 console.log('Message:', messageInput.value.trim());
 // Display success message to the user
formMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
 formMessage.classList.add('success');
// Clear the form fields after "successful" submission
contactForm.reset();
 // Optionally, hide the success message after a few seconds
 setTimeout(() => {
formMessage.classList.remove('success');
formMessage.textContent = ''; // Clear text as well
 }, 5000); // Message fades after 5 seconds
 } else {
 // If validation fails, display a general error message
 formMessage.textContent = 'Please correct the errors above.';
formMessage.classList.add('error');
 }
});
}
});