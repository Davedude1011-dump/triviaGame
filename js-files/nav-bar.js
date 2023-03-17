const optionOuters = document.querySelectorAll('.option-outer');

let lastClickedOption = null;

// Get the path of the current page
const path = window.location.pathname;

// Determine which option corresponds to the path and select it
if (path.includes('singleplayer.html')) {
  optionOuters[0].querySelector('.options-text').textContent += ' •';
} else if (path.includes('multiplayer.html')) {
  optionOuters[1].querySelector('.options-text').textContent += ' •';
} else if (path.includes('cosmetics.html')) {
  optionOuters[2].querySelector('.options-text').textContent += ' •';
} else if (path.includes('market.html')) {
  optionOuters[3].querySelector('.options-text').textContent += ' •';
} else if (path.includes('settings.html')) {
  optionOuters[4].querySelector('.options-text').textContent += ' •';
}
var slideout = new Slideout({
  'panel': document.getElementById('main'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 80,
  'side': 'right'
});

document.getElementById('hamburgerButton').ontouchstart = function() {
  slideout.toggle();
}

// Add touch event listeners to the slideout menu
document.addEventListener('DOMContentLoaded', function() {
  var touchStartX = null;
  var touchStartY = null;
  var touchEndX = null;
  var touchEndY = null;
  
  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
  }, { passive: false });
  
  document.getElementById('menu').addEventListener('touchmove', function(e) {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    
    // Calculate the distance swiped in the X and Y direction
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    
    // Check if the swipe was in the X direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // Prevent scrolling
      
      // Check if the slideout menu is already open or closed
      if (slideout.isOpen()) {
        // If the menu is open, slide it closed
        if (deltaX < 0) {
          slideout.close();
        }
      } else {
        // If the menu is closed, slide it open
        if (deltaX > 0) {
          slideout.open();
        }
      }
    }
  });
});

if (window.matchMedia("(orientation: landscape)").matches) {

  // Get the content of the main tag
  var mainContent = document.getElementById("main").innerHTML;

  // Remove the menu and main tags
  document.getElementById("menu").remove();
  document.getElementById("main").remove();

  // Add the main content to the body tag
  document.body.innerHTML += mainContent;
}