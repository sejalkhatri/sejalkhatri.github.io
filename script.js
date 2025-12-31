const contentDiv = document.getElementById("content");
const homePage = document.getElementById("home-page");

async function loadContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Load failed");

    const html = await response.text();

    // Hide home page sections when loading other content
    homePage.style.display = "none";

    // Inject dynamic content
    contentDiv.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    contentDiv.innerHTML = "<p>Error loading content.</p>";
    console.error(err);
  }
}

// Handle all SPA nav links
function setupNavLinks() {
  document.querySelectorAll("nav a[data-spa='true'], .card-content a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href.startsWith("https://")) {
        return;
      }
      e.preventDefault();
      if (href === "#top" || href === "#projects" || href === "#publications") {
        // Show home page sections
        homePage.style.display = "block";

        // Remove any previously loaded dynamic content
        contentDiv.innerHTML = "";

        // Scroll to target
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        // Load dynamic content
        loadContent(href);
      }
    });
  });
}

// Initialize SPA navigation
setupNavLinks();