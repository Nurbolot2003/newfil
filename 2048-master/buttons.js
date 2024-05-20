const popup = document.getElementById('m-popup');
const content = document.getElementById('m-content');

function togglePopup(index) {
  if (popup.style.display === 'none' || popup.style.display === '') {
   
    popup.style.display = 'flex';
    content.innerHTML = `Текст для кнопки ${index}`;
    popup.classList.add('m-popup-open');
  } else {
    closePopup();
  }
}

function closePopup() {
 
  popup.classList.remove('m-popup-open');
  popup.classList.add('m-popup-close');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('m-popup-close');
  }, 300);
}
