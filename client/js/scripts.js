// Simple image carousel with a hover effect
const images = document.querySelectorAll('.carousel img');

images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.1)';
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });
});
