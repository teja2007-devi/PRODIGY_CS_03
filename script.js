const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Feedback elements
const reqs = {
    len: document.getElementById('len'),
    upper: document.getElementById('upper'),
    lower: document.getElementById('lower'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
};

// 1. Show/Hide password functionality
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// 2. Real-time evaluation logic
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    // Evaluate rules and update individual checklist items
    const checks = {
        len: val.length >= 8,
        upper: /[A-Z]/.test(val),
        lower: /[a-z]/.test(val),
        number: /[0-9]/.test(val),
        special: /[^A-Za-z0-9]/.test(val)
    };

    // Update UI Checklist and calculate score
    for (const key in checks) {
        if (checks[key]) {
            score++;
            reqs[key].className = 'valid';
            reqs[key].textContent = reqs[key].textContent.replace('❌', '✅');
        } else {
            reqs[key].className = 'invalid';
            reqs[key].textContent = reqs[key].textContent.replace('✅', '❌');
        }
    }

    // Handle empty state explicitly
    if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Strength: Empty';
        strengthText.style.color = '#94a3b8';
        return;
    }

    // 3. Update Strength Bar UI based on score
    switch(score) {
        case 1:
        case 2:
            strengthBar.style.width = '33%';
            strengthBar.style.background = '#ef4444'; // Red
            strengthText.textContent = 'Strength: Weak ⚠️';
            strengthText.style.color = '#ef4444';
            break;
        case 3:
        case 4:
            strengthBar.style.width = '66%';
            strengthBar.style.background = '#f59e0b'; // Yellow/Orange
            strengthText.textContent = 'Strength: Medium 😐';
            strengthText.style.color = '#f59e0b';
            break;
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.background = '#22c55e'; // Green
            strengthText.textContent = 'Strength: Strong 💪';
            strengthText.style.color = '#22c55e';
            break;
    }
});