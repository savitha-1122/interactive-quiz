
const questions = [
    {
        question: "Which language is used for web page structure?",
        answers: ["Python", "HTML", "Java", "C++"],
        correct: "HTML"
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["CSS", "C", "Python", "SQL"],
        correct: "CSS"
    },
    {
        question: "Which language makes web pages interactive?",
        answers: ["HTML", "Java", "JavaScript", "C"],
        correct: "JavaScript"
    },
    {
        question: "Which company developed Java?",
        answers: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        correct: "Sun Microsystems"
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

function showQuestion() {
    resetState();

    let q = questions[currentQuestion];
    questionElement.textContent = q.question;

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => selectAnswer(button, q.correct));

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    feedback.textContent = "";
    answerButtons.innerHTML = "";
}

function selectAnswer(selectedButton, correctAnswer) {
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedButton.textContent === correctAnswer) {
        score++;
        feedback.textContent = "Correct answer!";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = "Wrong answer!";
    }

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    resetState();
    questionElement.textContent = "Quiz Completed!";
    scoreElement.textContent =
        `Your Score: ${score} / ${questions.length}`;

    nextButton.textContent = "Restart Quiz";
    nextButton.style.display = "inline-block";
    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = "";
    nextButton.textContent = "Next";
    nextButton.onclick = null;
    showQuestion();
}

showQuestion();
