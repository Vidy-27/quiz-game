const questions = [
  {
    question: "Which language is used to structure a webpage?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    answer: "HTML"
  },
  {
    question: "What does CSS mainly control?",
    options: [
      "The design and appearance of a webpage",
      "The database",
      "The computer's operating system",
      "The internet connection"
    ],
    answer: "The design and appearance of a webpage"
  },
  {
    question: "Which language makes a webpage interactive?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: "JavaScript"
  },
  {
    question: "What is GitHub mainly used for?",
    options: [
      "Watching movies",
      "Storing and managing code",
      "Editing photos",
      "Creating music"
    ],
    answer: "Storing and managing code"
  },
  {
    question: "Which symbol is commonly used for a comment in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let questionAnswered = false;

const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score-text");
const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionAnswered = false;

  questionNumber.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  scoreText.textContent = `Score: ${score}`;

  progress.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.style.display = "none";

  currentQuestion.options.forEach(function(option) {
    const button = document.createElement("button");

    button.textContent = option;
    button.className = "option-button";

    button.addEventListener("click", function() {
      selectAnswer(button, option, currentQuestion.answer);
    });

    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedButton, selectedAnswer, correctAnswer) {
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;

  const allOptionButtons =
    document.querySelectorAll(".option-button");

  allOptionButtons.forEach(function(button) {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "Correct! You're doing amazing ✨";
    feedbackElement.classList.add("correct-text");
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent =
      `Not quite! The correct answer is ${correctAnswer}.`;
    feedbackElement.classList.add("wrong-text");
  }

  scoreText.textContent = `Score: ${score}`;
  nextButton.style.display = "block";
}

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  finalScore.textContent =
    `Your final score: ${score} / ${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent =
      "Perfect score! Your brain is sparkling today! 🌟";
  } else if (score >= 3) {
    resultMessage.textContent =
      "Great job! You really know your stuff! 💖";
  } else {
    resultMessage.textContent =
      "Good try! Keep learning and try again! 🌸";
  }
}

nextButton.addEventListener("click", function() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", function() {
  currentQuestionIndex = 0;
  score = 0;

  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  loadQuestion();
});

loadQuestion();
