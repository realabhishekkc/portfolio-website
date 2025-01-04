document.addEventListener("DOMContentLoaded", () => {
  // Dark theme toggle
  const themeToggleButton = document.getElementById("theme-toggle");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const theme = document.body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
      localStorage.setItem("theme", theme);
    });
  }

  // Contact form submit alert
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for reaching out! I will get back to you soon.");
    });
  }

  // Load theme on page load
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  }

  // Typewriter effect
  const typewriterElement = document.getElementById("typewriter-text");
  if (typewriterElement) {
    const textArray = [
      "With 6 years of experience in WordPress, SEO, and Digital Marketing"
    ];
    let textIndex = 0;
    let charIndex = 0;

    const typeWriter = () => {
      if (charIndex < textArray[textIndex].length) {
        typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Typing speed
      } else {
        setTimeout(() => {
          typewriterElement.textContent = ""; // Clear text
          charIndex = 0;
          textIndex = (textIndex + 1) % textArray.length; // Move to the next text
          typeWriter();
        }, 2000); // Delay before starting the next text
      }
    };

    typeWriter();
  }

  // Fade-in effect for hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    // Trigger fade-in animation immediately on page load
    heroContent.classList.add("fade-in");
  }
});
