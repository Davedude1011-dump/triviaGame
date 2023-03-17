const categories = document.getElementById("categories");

let selectedCategory = null;

// Check if categoryNum is in local storage
if (localStorage.getItem("categoryNum")) {
  const index = parseInt(localStorage.getItem("categoryNum")) - 9;
  selectedCategory = categories.children[index];
  selectedCategory.textContent += " •";
}

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
  selectedDifficulty = difficulty.children[index];
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