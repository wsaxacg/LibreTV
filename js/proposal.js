document.addEventListener("DOMContentLoaded", () => {
  const config = window.proposalConfig;

  // Landing Section
  const landing = document.getElementById("landing");
  if (landing) {
    const coupleNames = config.coupleNames.join(" & ");
    landing.querySelector("h1").textContent = coupleNames;
    landing.querySelector("p").textContent = config.landingMessage;
    createHearts();
  }

  // Gallery Section
  const photoGrid = document.getElementById("photo-grid");
  if (photoGrid) {
    config.photos.forEach((photo, index) => {
      const photoEl = document.createElement("div");
      photoEl.className = "cursor-pointer group relative";
      photoEl.innerHTML = `
        <img src="${photo.url}" alt="${photo.caption}" class="w-full h-full object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform" loading="lazy">
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <p class="text-white text-center">${photo.caption}</p>
        </div>
      `;
      photoEl.addEventListener("click", () => openLightbox(index));
      photoGrid.appendChild(photoEl);
    });
  }

  // Timeline Section
  const timelineContainer = document.getElementById("timeline-container");
  if (timelineContainer) {
    config.timeline.forEach((item, index) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = `timeline-item mb-8 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`;
      timelineItem.innerHTML = `
        <div class="timeline-item-content">
          <time class="text-sm text-gray-500">${item.date}</time>
          <h3 class="text-xl font-bold text-rose-700 mt-1">${item.title}</h3>
          <p class="text-gray-600 mt-2">${item.description}</p>
          ${item.photo ? `<img src="${item.photo}" alt="${item.title}" class="mt-4 rounded-lg shadow-sm">` : ""}
        </div>
      `;
      timelineContainer.appendChild(timelineItem);
    });
    animateTimeline();
  }

  // Proposal Section
  const proposalMessage = document.getElementById("proposal-message");
  if (proposalMessage) {
    proposalMessage.textContent = config.proposalMessage;
  }
  
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  if (yesButton && noButton) {
      yesButton.addEventListener("click", handleYes);
      noButton.addEventListener("click", handleNo);
  }

  // Music Player
  const musicPlayer = document.getElementById("music-player");
  if (musicPlayer && config.backgroundMusic.url) {
    const audio = document.getElementById("bg-music");
    const toggle = document.getElementById("music-toggle");
    const playIcon = document.getElementById("music-play-icon");
    const pauseIcon = document.getElementById("music-pause-icon");

    audio.src = config.backgroundMusic.url;

    toggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
      } else {
        audio.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      }
    });
  }
  
  // Lightbox
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
    document.getElementById("prev-lightbox").addEventListener("click", prevLightboxImage);
    document.getElementById("next-lightbox").addEventListener("click", nextLightboxImage);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
});

function createHearts() {
  const container = document.getElementById("hearts-container");
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(heart);
  }
}

function animateTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((item) => observer.observe(item));
}

let currentPhotoIndex = 0;
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightbox();
  document.getElementById("lightbox").classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

function updateLightbox() {
    const photos = window.proposalConfig.photos;
    const photo = photos[currentPhotoIndex];
    document.getElementById("lightbox-img").src = photo.url;
    document.getElementById("lightbox-caption").textContent = photo.caption;
}

function prevLightboxImage() {
    currentPhotoIndex = (currentPhotoIndex - 1 + window.proposalConfig.photos.length) % window.proposalConfig.photos.length;
    updateLightbox();
}

function nextLightboxImage() {
    currentPhotoIndex = (currentPhotoIndex + 1) % window.proposalConfig.photos.length;
    updateLightbox();
}


function handleYes() {
  const proposalSection = document.getElementById("proposal");
  proposalSection.innerHTML = `<h2 class="text-6xl font-bold text-rose-800">She said YES! 🎉</h2>`;
  createConfetti();
}

function handleNo() {
  const responses = [
    "Are you sure?",
    "Really?",
    "Think again!",
    "I'll be sad...",
    "Last chance!",
  ];
  const noButton = document.getElementById("no-button");
  const yesButton = document.getElementById("yes-button");
  const currentScale = noButton.style.transform ? parseFloat(noButton.style.transform.replace("scale(", "").replace(")", "")) : 1;

  noButton.textContent = responses[Math.floor(Math.random() * responses.length)];
  yesButton.style.transform = `scale(${currentScale + 0.5})`;
}

function createConfetti() {
    const container = document.getElementById("celebration-container");
    if(!container) return;

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(confetti);
    }
}
