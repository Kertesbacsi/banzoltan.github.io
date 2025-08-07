// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Aktív nav link kiemelés scroll alapján
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateNavLink);

// Typewriter effekt
const words = [
  "diversity.",
  "creativity over chaos.",
  "the power of calm thinking."
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const currentWord = words[wordIndex];
  const visibleText = isDeleting
    ? currentWord.substring(0, charIndex--)
    : currentWord.substring(0, charIndex++);

  typewriterEl.textContent = visibleText;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 120;
  setTimeout(type, speed);
}

type();

// About szekció dinamikus kép- és szövegváltás
const aboutTexts = [
  "In my free time, I enjoy reading, spending time outdoors, and exploring new interests. I’ve always been curious and hands-on—whether it's tinkering with things, building LEGO models, or repairing something just for the fun of it. I used to be an avid gamer, spending hours playing all kinds of video games, and although I play less now, I still appreciate the creativity and challenge they offer. Recently, I’ve taken up motorcycling, which has quickly become a new passion of mine. At the same time, I truly enjoy driving and find peace in simply being behind the wheel. Despite my active lifestyle, I also value quiet moments—watching a good movie in the evening or just relaxing and doing nothing. I would describe myself as someone who lives a diverse life. I believe in experiencing as much as I can while I'm young, and I strive to make the most out of every opportunity that comes my way. By the way the most important is to spend time with my friends, they always heal me. :)",
  "I am currently serving as a volunteer reservist in the Hungarian Defence Forces, and I am close to completing my basic military training. This experience has taught me the importance of discipline, perseverance, and teamwork. As a reservist, I have learned to adapt quickly to demanding situations, follow strict protocols, and maintain both physical and mental resilience. The training has helped me develop a strong sense of duty, reliability, and the ability to perform effectively under pressure—skills that are valuable both in military and civilian life.",
  "I currently serve as the Head of Social Affairs at the Student Union of the University of Pannonia. In this role, I am responsible for overseeing matters related to social scholarships, dormitory placements, and the evaluation of exceptional student cases. I manage and coordinate the majority of these processes while leading a dedicated team focused on social issues. Through this position, I have developed strong leadership, organizational, and decision-making skills, along with a deep sense of responsibility and empathy. My role requires clear communication, discretion, and a commitment to supporting students in need, which has helped me grow both personally and professionally",
  "I have been passionate about sports since early childhood. With over 14 years of football behind me and regular strength training at the gym, physical activity has always been a core part of my life. For me, sport is not just exercise—it’s a form of relaxation and mental clarity. Throughout the years, I’ve explored a wide variety of disciplines, including swimming, rowing, fencing, climbing, and countless ball sports. I genuinely enjoy trying new activities, and movement has become one of the most important pillars of my life. Staying active fuels my motivation, builds discipline, and helps me maintain a balanced and healthy lifestyle."
];

const thumbs = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");
const aboutText = document.getElementById("about-text");

let currentIndex = 0;

function updateMainImage(index) {
  const newSrc = thumbs[index].src;
  const newText = aboutTexts[index];

  mainImage.classList.add("fade-out");

  setTimeout(() => {
    mainImage.src = newSrc;
    aboutText.textContent = newText;

    mainImage.classList.remove("fade-out");
    mainImage.classList.add("fade-in");

    setTimeout(() => {
      mainImage.classList.remove("fade-in");
    }, 500);
  }, 300);

  document.querySelector(".thumb.active").classList.remove("active");
  thumbs[index].classList.add("active");

  currentIndex = index;
}

// Bélyegképekre kattintás
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateMainImage(index);
  });
});

document.getElementById("moreBtn").addEventListener("click", () => {
  const aboutSection = document.querySelector("#about");
  const scrollTarget = aboutSection.offsetTop + aboutSection.offsetHeight / 1;
  window.scrollTo({
    top: scrollTarget,
    behavior: "smooth"
  });
});


// Timeline scroll reveal
const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach(item => {
  const icon = item.dataset.icon || "fa-circle";
  const text = item.dataset.text || "";
  const year = item.dataset.year || "";

  const content = document.createElement("div");
  content.classList.add("content");

  const iconEl = document.createElement("i");
  iconEl.classList.add("fas", icon);

  const textEl = document.createElement("div");
  textEl.innerHTML = `<strong>${year}</strong><br>${text}`;

  content.appendChild(iconEl);
  content.appendChild(textEl);
  item.appendChild(content);
});

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      item.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);



// Alapértelmezett szöveg betöltése
aboutText.textContent = aboutTexts[0];
