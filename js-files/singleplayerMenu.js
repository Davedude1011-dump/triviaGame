const categories = document.getElementById("categories");

let selectedCategory = null;

// Check if categoryNum is in local storage
if (localStorage.getItem("categoryNum")) {
  const index = parseInt(localStorage.getItem("categoryNum")) - 9;
  selectedCategory = categories.children[index];
  selectedCategory.textContent += " •";
}

if (window.innerHeight > window.innerWidth){ // changing the onclick to ontouchstart for portrait users using their
  //portrait:
  categories.addEventListener("touchstart", function(event) {
    if (event.target.tagName === "LI") {
      if (selectedCategory !== null) {
        selectedCategory.textContent = selectedCategory.textContent.replace(" •", "");
      }
      
      event.target.textContent += " •";
      
      const index = Array.from(categories.children).indexOf(event.target);
      
      localStorage.setItem("categoryNum", index + 9);
      
      selectedCategory = event.target;
    }
  });
  
  const difficulty = document.getElementById("difficulty");
  
  let selectedDifficulty = null;
  
  // Check if difficultyNum is in local storage
  if (localStorage.getItem("difficultyNum")) {
    const index = parseInt(localStorage.getItem("difficultyNum"));
    selectedDifficulty = difficulty.children[index-1];
    selectedDifficulty.textContent += " •";
  }
  
  difficulty.addEventListener("touchstart", function(event) {
    if (event.target.tagName === "LI") {
      if (selectedDifficulty !== null) {
        selectedDifficulty.textContent = selectedDifficulty.textContent.replace(" •", "");
      }
      
      event.target.textContent += " •";
      
      const index = Array.from(difficulty.children).indexOf(event.target);
      
      localStorage.setItem("difficultyNum", index+1);
      
      selectedDifficulty = event.target;
    }
  });
}
else if (window.innerHeight < window.innerWidth){ // changing the ontouchstart to onclick for landscape users with a mouse
  //landscape:
  categories.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
      if (selectedCategory !== null) {
        selectedCategory.textContent = selectedCategory.textContent.replace(" •", "");
      }
      
      event.target.textContent += " •";
      
      const index = Array.from(categories.children).indexOf(event.target);
      
      localStorage.setItem("categoryNum", index + 9);
      
      selectedCategory = event.target;
    }
  });
  
  const difficulty = document.getElementById("difficulty");
  
  let selectedDifficulty = null;
  
  // Check if difficultyNum is in local storage
  if (localStorage.getItem("difficultyNum")) {
    const index = parseInt(localStorage.getItem("difficultyNum"));
    selectedDifficulty = difficulty.children[index-1];
    selectedDifficulty.textContent += " •";
  }
  
  difficulty.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
      if (selectedDifficulty !== null) {
        selectedDifficulty.textContent = selectedDifficulty.textContent.replace(" •", "");
      }
      
      event.target.textContent += " •";
      
      const index = Array.from(difficulty.children).indexOf(event.target);
      
      localStorage.setItem("difficultyNum", index+1);
      
      selectedDifficulty = event.target;
    }
  });
}


const container = document.getElementById("container");
let startX, startY, scrollX, scrollY, isScrolling;

container.addEventListener("touchstart", function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  scrollX = container.scrollLeft;
  scrollY = container.scrollTop;
  isScrolling = true;
});

container.addEventListener("touchmove", function(event) {
  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;
  const distanceX = currentX - startX;
  const distanceY = currentY - startY;
  container.scrollLeft = scrollX - distanceX;
  container.scrollTop = scrollY - distanceY;
  isScrolling = true;
});

container.addEventListener("touchend", function(event) {
  isScrolling = false;
});

function animateScroll() {
  if (isScrolling) {
    requestAnimationFrame(animateScroll);
    container.scrollLeft += (scrollX - container.scrollLeft) * 0.1;
    container.scrollTop += (scrollY - container.scrollTop) * 0.1;
  }
}

animateScroll();