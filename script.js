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

  // Simple swipe simulation: click left/right
  card.onclick = (e) => {
    const x = e.clientX;
    if (x < window.innerWidth / 2) {
      // Dislike
    } else {
      likedCats.push(imgUrl);
    }
    currentIndex++;
    showNextCat();
  };
}

function showSummary() {
  cardStack.style.display = 'none';
  summary.classList.remove('hidden');
  summary.innerHTML = `<h2>You liked ${likedCats.length} cats!</h2>`;
  likedCats.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.width = 150;
    summary.appendChild(img);
  });
}

fetchCats();
