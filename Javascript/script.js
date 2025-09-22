const images = document.querySelectorAll('.slides img');
const songTitles = ["7 Years", "Memories", "Photograph"];
let current = 0;

function updateSlider(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  
  document.querySelector('#slider-title .song-title').textContent = songTitles[index];
}

document.getElementById('left-button').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  updateSlider(current);
});

document.getElementById('right-button').addEventListener('click', () => {
  current = (current + 1) % images.length;
  updateSlider(current);
});