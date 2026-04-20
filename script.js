function handleScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 120;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}
window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);