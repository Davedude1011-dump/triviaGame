const usedQuestionIds = new Set();

var questionAmount = 25
var categoryNum = localStorage.getItem("categoryNum") || 9
var difficultyNum = localStorage.getItem("difficultyNum") || 2
if (difficultyNum == 1) { var difficulty = "easy" }
if (difficultyNum == 2) { var difficulty = "medium" }
if (difficultyNum == 3) { var difficulty = "hard" }

var questionNum = 1

var points = 0

function correct() {
    console.log("correct")
    questionNum ++
    points ++
    makeQuestions()
}
function wrong() {
    console.log("wrong")
    questionNum ++
    makeQuestions()
}

function createAnswerButtons(correct_answer, wrong_answers) {
    if (wrong_answers.length < 3) { // in this case its a true or false:
        var correctAnswerButton = document.createElement("button")
        var incorrectAnswerButton = document.createElement("button")
    
        correctAnswerButton.textContent = correct_answer
        incorrectAnswerButton.textContent = wrong_answers

        correctAnswerButton.onclick = correct
        incorrectAnswerButton.onclick = wrong
    
        var buttonParent = document.querySelector(".answers")
        buttonParent.appendChild(correctAnswerButton)
        buttonParent.appendChild(incorrectAnswerButton)
    }
    else { // in this case its a multiple choice:
        var correctAnswerButton = document.createElement("button")
        var incorrectAnswerButton1 = document.createElement("button")
        var br = document.createElement("br")
        var incorrectAnswerButton2 = document.createElement("button")
        var incorrectAnswerButton3 = document.createElement("button")
        
        correctAnswerButton.textContent = decodeURIComponent(correct_answer.replace(/&quot;|&#039;/g, match => match === '&quot;' ? '"' : "'"));
        incorrectAnswerButton1.textContent = decodeURIComponent(wrong_answers[0].replace(/&quot;|&#039;/g, match => match === '&quot;' ? '"' : "'"));
        incorrectAnswerButton2.textContent = decodeURIComponent(wrong_answers[1].replace(/&quot;|&#039;/g, match => match === '&quot;' ? '"' : "'"));
        incorrectAnswerButton3.textContent = decodeURIComponent(wrong_answers[2].replace(/&quot;|&#039;/g, match => match === '&quot;' ? '"' : "'"));
        
        correctAnswerButton.onclick = correct
        incorrectAnswerButton1.onclick = wrong
        incorrectAnswerButton2.onclick = wrong
        incorrectAnswerButton3.onclick = wrong
        
        var buttonParent = document.querySelector(".answers")
        
        // Create an array of buttons in a random order
        var buttons = [correctAnswerButton, incorrectAnswerButton1, incorrectAnswerButton2, incorrectAnswerButton3]
        buttons.sort(() => Math.random() - 0.5)
        buttons.splice(2, 0, br)
        
        // Append each button in the randomized order
        buttons.forEach(button => buttonParent.appendChild(button))
    }
}

function loadQuestions(questionList) {
    console.log(questionList[0])
    document.querySelector(".question-num").textContent = questionNum
    document.querySelector(".category").textContent = questionList[0].category
    document.querySelector(".difficulty").textContent = questionList[0].difficulty
    document.querySelector(".question").textContent = decodeURIComponent(questionList[0].question.replace(/&quot;|&#039;/g, match => match === '&quot;' ? '"' : "'"));
    createAnswerButtons(questionList[0].correct_answer, questionList[0].incorrect_answers)
}

function makeQuestions() {
    if (questionNum <= questionAmount) {
        var url = `https://opentdb.com/api.php?amount=1&category=${categoryNum}&difficulty=${difficulty}&exclude=${Array.from(usedQuestionIds).join(',')}`;
        document.querySelector(".answers").innerHTML = ''
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
    
                // Extract question IDs from the response and add them to the used IDs set
                const questionIds = data.results.map(result => result.question_id);
                questionIds.forEach(id => usedQuestionIds.add(id));
    
                loadQuestions(data.results)
            })
            .catch(error => {
                console.error(error);
            });
    }
    else {
        window.open("../side-bar-files/singleplayer.html", "_self")
    }
}

makeQuestions()