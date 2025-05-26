const cardStack = document.getElementById('card-stack');
const summary = document.getElementById('summary');
const likedCats = [];
let catImages = [];
let currentIndex = 0;

async function fetchCats() {
  for (let i = 0; i < 10; i++) {
    catImages.push(`https://cataas.com/cat?${i}`);
  }
  showNextCat();
}

function showNextCat() {
  if (currentIndex >= catImages.length) {
    showSummary();
    return;
  }

  const imgUrl = catImages[currentIndex];
  const card = document.createElement('div');
  card.className = 'cat-card';
  card.style.backgroundImage = `url(${imgUrl})`;
  cardStack.innerHTML = '';
  cardStack.appendChild(card);

  // Add like/dislike buttons
  createButtons(card, imgUrl);
}

function createButtons(card, imgUrl) {
  // Clear any old buttons
  const oldButtons = document.getElementById('buttons');
  if (oldButtons) oldButtons.remove();

  const buttons = document.createElement('div');
  buttons.id = 'buttons';

  const dislikeBtn = document.createElement('button');
  dislikeBtn.textContent = '👎';
  dislikeBtn.title = 'Dislike';

  const likeBtn = document.createElement('button');
  likeBtn.textContent = '👍';
  likeBtn.title = 'Like';

  buttons.appendChild(dislikeBtn);
  buttons.appendChild(likeBtn);
  document.body.appendChild(buttons);

  dislikeBtn.onclick = () => {
    animateCard(card, 'left');
  };

  likeBtn.onclick = () => {
    likedCats.push(imgUrl);
    animateCard(card, 'right');
  };
}

function animateCard(card, direction) {
  // Animate card offscreen
  card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  if (direction === 'left') {
    card.style.transform = 'translateX(-150vw) rotate(-30deg)';
  } else {
    card.style.transform = 'translateX(150vw) rotate(30deg)';
  }
  card.style.opacity = '0';

  // Remove buttons while animating
  const buttons = document.getElementById('buttons');
  if (buttons) buttons.remove();

  setTimeout(() => {
    currentIndex++;
    showNextCat();
  }, 500);
}

function showSummary() {
  cardStack.style.display = 'none';
  summary.classList.remove('hidden');
  summary.innerHTML = `<h2>You liked ${likedCats.length} cats!</h2>`;
  likedCats.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    summary.appendChild(img);
  });
}

fetchCats();
