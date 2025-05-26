const cardStack = document.getElementById('card-stack');
const summary = document.getElementById('summary');
const likedCats = [];
let catImages = [];
let currentIndex = 0;
let startX = 0;
let currentCard = null;

async function fetchCats() {
  for (let i = 0; i < 15; i++) {
    catImages.push(`https://cataas.com/cat?${i}`);
  }
  showNextCat();
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
  
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    restartBtn.onclick = () => {
      likedCats.length = 0;
      currentIndex = 0;
      summary.classList.add('hidden');
      cardStack.style.display = 'block';
      fetchCats();
    };
    summary.appendChild(restartBtn);
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
  
    let startX = null;
    let offsetX = 0;
    let dragging = false;
  
    function onDragStart(e) {
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      dragging = true;
      card.style.transition = 'none';
    }
  
    function onDragMove(e) {
      if (!dragging || startX === null) return;
  
      let x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      offsetX = x - startX;
      card.style.transform = `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)`;
  
      // Prevent scrolling on touch devices while dragging
      if (e.type === 'touchmove') e.preventDefault();
    }
  
    function onDragEnd() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = 'transform 0.3s ease';
  
      if (offsetX > 100) {
        likedCats.push(imgUrl);
        animateCard(card, 'right');
      } else if (offsetX < -100) {
        animateCard(card, 'left');
      } else {
        // Snap back to center if not swiped far enough
        card.style.transform = 'translateX(0) rotate(0)';
      }
  
      startX = null;
      offsetX = 0;
    }
  
    card.addEventListener('mousedown', onDragStart);
    card.addEventListener('touchstart', onDragStart, { passive: false });
    
    card.addEventListener('mousemove', onDragMove);
    card.addEventListener('touchmove', onDragMove, { passive: false });
    
    card.addEventListener('mouseup', onDragEnd);
    card.addEventListener('touchend', onDragEnd, { passive: false });
    card.addEventListener('touchcancel', onDragEnd, { passive: false });
    
    card.addEventListener('mouseleave', () => {
      if (dragging) onDragEnd();
    });
    
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
