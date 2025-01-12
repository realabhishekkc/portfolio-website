document.addEventListener("DOMContentLoaded", () => {

  // Contact form submission with AJAX
  const form = document.getElementById("contact-form"); // Use ID for better specificity
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      fetch('contact.php', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) { // Check for HTTP errors (4xx or 5xx)
              return response.text().then(text => { throw new Error(text) }); // Throw error with the error message from PHP
          }
          return response.text();
      })
      .then(data => {
          alert(data);
          if (data === "Message sent successfully!") {
              form.reset();
          }
      })
      .catch(error => {
          console.error("Fetch Error:", error); // Log the full error object
          alert("An error occurred: " + error.message); // Display a more user-friendly error
      });
      });
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

// Back to Top Button Logic
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
    backToTopButton.classList.remove("hide");
  } else {
    backToTopButton.classList.add("hide");
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

