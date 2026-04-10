document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const responseContainer = document.getElementById('response-container');
    const responseMessage = document.getElementById('response-message');
    const buttonContent = fetchBtn.querySelector('.button-content');
    const API_BASE = '/api';

    fetchBtn.addEventListener('click', async () => {
        // UI Loading state
        const originalContent = buttonContent.innerHTML;
        buttonContent.innerHTML = 'Fetching...';
        fetchBtn.style.opacity = '0.8';
        fetchBtn.disabled = true;

        try {
            // Keep browser requests same-origin; Vercel rewrites /api/* to EC2.
            const response = await fetch(`${API_BASE}/message`);
            const data = await response.json();

            // UI Success state
            responseContainer.classList.remove('empty');
            responseContainer.classList.add('active');

            // Typewriter effect for string
            typeWriterEffect(responseMessage, data.message);

        } catch (error) {
            responseContainer.classList.remove('empty');
            responseMessage.textContent = 'Error: Could not connect to server.';
            responseMessage.style.color = '#ef4444';
        } finally {
            // Restore button state
            buttonContent.innerHTML = originalContent;
            fetchBtn.style.opacity = '1';
            fetchBtn.disabled = false;
        }
    });

    function typeWriterEffect(element, text, i = 0) {
        if (i === 0) {
            element.textContent = '';
        }
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriterEffect(element, text, i + 1), 30);
        }
    }
});
