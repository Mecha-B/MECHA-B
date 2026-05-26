const carousel = document.getElementById("carousel");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalQuote = document.getElementById("modalQuote");
const closeBtn = document.getElementById("close");
const search = document.getElementById("search");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderCards(data) {
    carousel.innerHTML = "";

    data.forEach((student, index) => {
        const card = document.createElement("div");
        card.className = "card";

      card.innerHTML = `
      ${(student.roll === "2402100" || student.roll === "2402109")
    ? '<span class="developer-badge">Developer</span>'
    : ""
}

${(student.roll === "2402100" || student.roll === "2402078")
    ? '<span class="cr-badge">CR</span>'
    : ""
}
    
      <img src="${student.image}" class="student-photo">
      <h3>${student.name}</h3>
      <p>${student.roll}</p>
      <p>${student.college}</p>
      <p>${student.hometown}</p>

     <a href="${student.whatsapp}" target="_blank" rel="noopener" title="WhatsApp">
      <img src="group/whatsapp.jpg" alt="WhatsApp" class="social-icon">
  </a>
  
<a href="${student.facebook}" target="_blank" rel="noopener" title="Facebook">
      <img src="group/facebook.jpg" alt="Facebook" class="social-icon">
  </a>
<a href="${student.email}" target="_blank" rel="noopener" title="Email">
      <img src="group/email.jpg" alt="Email" class="social-icon">
  </a>
`;

        card.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = student.image;
            modalName.innerText = student.name;
            modalQuote.innerText = student.quote;
        });

        carousel.appendChild(card);
    });
}

// Search
search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.roll.toLowerCase().includes(value)
    );
    renderCards(filtered);
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};
carousel.addEventListener("mousemove", (e) => {
    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const center = rect.width / 2;

    carousel.scrollLeft += (x - center) / 25;
});
let speed = 1.0; // Adjust this value for faster/slower auto-scroll
let isPaused = false;

function autoScroll() {
    if (!isPaused) {
        carousel.scrollLeft += speed;

        // smooth loop without hard jump
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft -= carousel.scrollWidth / 2;
        }
    }

    requestAnimationFrame(autoScroll);
}

autoScroll();
function pauseAutoScroll() {
    isPaused = true;

    setTimeout(() => {
        isPaused = false;
    }, 2000); // auto resumes after 2s
}
// Loader
window.onload = () => {
    document.getElementById("loader").style.display = "none";
    renderCards(students);
};
function getCardScrollAmount() {
    const card = document.querySelector(".card");
    if (!card) return 0;

    const style = window.getComputedStyle(card);
    const width = card.offsetWidth;
    const gap = parseInt(style.marginRight || 20);

    return (width + gap) * 2; // 5 cards at once
}
prevBtn.addEventListener("click", () => {
    pauseAutoScroll();

    carousel.scrollBy({
        left: -getStep(),
        behavior: "smooth"
    });
});
nextBtn.addEventListener("click", () => {
    pauseAutoScroll();

    carousel.scrollBy({
        left: getStep(),
        behavior: "smooth"
    });
});
function getStep() {
    const card = document.querySelector(".card");
    if (!card) return 0;

    const gap = 20; // fixed value is MORE stable than computed style

    return (card.offsetWidth + gap) * 2;
}
