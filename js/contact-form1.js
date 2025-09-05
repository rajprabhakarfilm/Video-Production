// Contact page JavaScript for animations, form handling, and dual email system

// Fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to check if element is partially in viewport
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle fade-in animations
    function handleFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-in');

        fadeElements.forEach(element => {
            if (isElementPartiallyInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check for elements already in view
    setTimeout(handleFadeIn, 100);

    // Handle scroll events
    window.addEventListener('scroll', handleFadeIn);
    window.addEventListener('resize', handleFadeIn);

    // =================== ENHANCED FORM HANDLING ===================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // ✅ Enhanced form validation
        function validateForm(formData) {
            const errors = [];
            const requiredFields = ['firstName', 'lastName', 'email', 'message'];

            requiredFields.forEach(field => {
                if (!formData.get(field) || formData.get(field).trim() === '') {
                    errors.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
                }
            });

            const email = formData.get('email');
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    errors.push('Please enter a valid email address');
                }
            }

            return errors;
        }

        // ✅ Show success message (enhanced styling)
        function showSuccessMessage() {
            // Remove any existing messages
            document.querySelectorAll('.form-success, .form-error').forEach(msg => msg.remove());

            const successDiv = document.createElement('div');
            successDiv.className = 'form-success fade-in visible';
            successDiv.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #d4edda, #c3e6cb);
                    border: 1px solid #28a745;
                    color: #155724;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);
                    animation: slideInDown 0.5s ease-out;
                ">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
                    <strong style="font-size: 1.1rem;">Message Sent Successfully!</strong><br>
                    <p style="margin: 0.5rem 0; opacity: 0.9;">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    <small style="opacity: 0.8;">A confirmation email has been sent to your email address.</small>
                </div>
            `;
            contactForm.insertBefore(successDiv, contactForm.firstChild);

            // Auto-remove after 6 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.style.animation = 'slideOutUp 0.5s ease-in forwards';
                    setTimeout(() => successDiv.remove(), 500);
                }
            }, 6000);
        }

        // ✅ Show error messages (enhanced styling)
        function showErrorMessages(errors) {
            // Remove any existing messages
            document.querySelectorAll('.form-error, .form-success').forEach(error => error.remove());

            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error fade-in visible';
            errorDiv.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
                    border: 1px solid #dc3545;
                    color: #721c24;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);
                    animation: slideInDown 0.5s ease-out;
                ">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
                    <strong style="font-size: 1.1rem;">Please fix the following errors:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem; text-align: left;">
                        ${errors.map(error => `<li style="margin-bottom: 0.3rem;">${error}</li>`).join('')}
                    </ul>
                </div>
            `;
            contactForm.insertBefore(errorDiv, contactForm.firstChild);

            // Scroll to error message
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // ✅ Send form data to Admin via Web3Forms
        async function sendEmailWithWeb3Forms(formData) {
            const WEB3FORMS_KEY = "2ffa293a-f78b-463d-b119-09dfa871615f"; // Replace with your actual key
            formData.append("access_key", WEB3FORMS_KEY);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    return { success: true };
                } else {
                    throw new Error(result.message || "Failed to send via Web3Forms");
                }
            } catch (error) {
                console.error("Web3Forms error:", error);
                return { success: false, error: error.message };
            }
        }

        // ✅ Send acknowledgment email to user via EmailJS
        async function sendAcknowledgmentEmail(formData) {
            const SERVICE_ID = "service_vi2s4v8";
            const ACK_TEMPLATE_ID = "template_wjaz6p4";
            const PUBLIC_KEY = "jD_ipr1bi6W8b6Fxv";

            const ackTemplateParams = {
                to_email: formData.get('email'),
                to_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                user_message: formData.get('message'),
                service_requested: formData.get('service') || 'Not specified',
                phone: formData.get('phone') || 'Not provided',
//                whatsapp: formData.get('whatsapp') || 'Not provided',
                submission_date: new Date().toLocaleDateString(),
                company_name: 'Provideos Studios'
            };

            return await emailjs.send(SERVICE_ID, ACK_TEMPLATE_ID, ackTemplateParams, PUBLIC_KEY);
        }

        // ✅ Enhanced form submission handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Check honeypot field (bot protection from original code)
            if (formData.get('botcheck')) {
                console.log('Bot detected, form not submitted');
                return;
            }

            // Validate form
            const errors = validateForm(formData);
            if (errors.length > 0) {
                showErrorMessages(errors);
                return;
            }

            // Clear any existing error messages
            document.querySelectorAll('.form-error').forEach(error => error.remove());

            // Show loading state with enhanced button animation
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <span style="
                        width: 16px;
                        height: 16px;
                        border: 2px solid transparent;
                        border-top: 2px solid currentColor;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    "></span>
                    Sending...
                </span>
            `;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            try {
                // Step 1: Send to Admin via Web3Forms
                const result = await sendEmailWithWeb3Forms(formData);

                if (!result.success) {
                    throw new Error(result.error || "Admin email failed");
                }

                // Step 2: Send acknowledgment to user via EmailJS
                try {
                    await sendAcknowledgmentEmail(formData);
                    console.log('Acknowledgment email sent successfully');
                } catch (ackError) {
                    console.warn('Acknowledgment email failed:', ackError);
                    // Don't fail the whole process if acknowledgment fails
                }

                // Show success message and reset form
                showSuccessMessage();
                contactForm.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessages(['Failed to send message. Please try again later or contact us directly.']);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }

    // Smooth scrolling for any anchor links (preserved from original)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// =================== INTERACTIVE EFFECTS (PRESERVED) ===================
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to contact items (preserved from original)
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons (preserved and enhanced)
    const buttons = document.querySelectorAll('.submit-btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple if button is disabled
            if (this.disabled) return;

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// =================== ENHANCED CSS ANIMATIONS ===================
const style = document.createElement('style');
style.textContent = `
    /* Preserved ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    /* Enhanced animations for success/error messages */
    @keyframes slideInDown {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOutUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px);
        }
    }

    /* Spinning loader for submit button */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Enhanced button and social link styles */
    .submit-btn, .social-link {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .submit-btn:disabled {
        cursor: not-allowed;
    }

    /* Enhanced form field focus states */
    .contact-form input:focus,
    .contact-form textarea:focus,
    .contact-form select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        transform: scale(1.02);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);