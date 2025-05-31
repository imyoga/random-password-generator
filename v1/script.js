function generatePassword() {
    const length = document.getElementById('length').value;
    const lowercase = document.getElementById('lowercase').checked;
    const uppercase = document.getElementById('uppercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    let chars = '';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%&*?-_=+';

    if (chars === '') {
        showNotification('Please select at least one character type.', 'error');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    if (!passwordField.value) {
        showNotification('Generate a password first!', 'error');
        return;
    }
    
    navigator.clipboard.writeText(passwordField.value).then(() => {
        showNotification('Password copied! ✓', 'success');
    }).catch(() => {
        showNotification('Failed to copy password', 'error');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `copy-success ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger reflow to restart animation
    notification.offsetHeight;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
        notification.remove();
    }, 2000);
}

// Generate password on page load
document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
});
