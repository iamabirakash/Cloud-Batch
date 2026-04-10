document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const responseContainer = document.getElementById('response-container');
    const responseMessage = document.getElementById('response-message');
    const buttonContent = fetchBtn.querySelector('.button-content');
    
    fetchBtn.addEventListener('click', async () => {
        // UI Loading state
        const originalContent = buttonContent.innerHTML;
        buttonContent.innerHTML = 'Fetching...';
        fetchBtn.style.opacity = '0.8';
        fetchBtn.disabled = true;
        
        try {
            // ⚠️ IMPORTANT: When you deploy, change this to your EC2 instance's IP!
            // Example: const BACKEND_URL = 'http://123.45.67.89:3000';
            const BACKEND_URL = 'http://51.20.230.81:3000'; 
            
            const response = await fetch(`${BACKEND_URL}/api/message`);
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
