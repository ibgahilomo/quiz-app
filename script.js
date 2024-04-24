// script.js
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const rightAnswerElement = document.getElementById('right-answer');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setnextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setnextQuestion();
    quizScore = 0;
    rightAnswerElement.innerText = '0';
}

function setnextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if (correct) {
        quizScore++;
        rightAnswerElement.innerText = quizScore;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
        rightAnswerElement.innerText = quizScore; // Update the score display
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false }
        ]
    },
    {
        question: 'Which of the following is NOT a markup language?',
        answers: [
            { text: 'JavaScript', correct: true },
            { text: 'HTML', correct: false },
            { text: 'XML', correct: false },
            { text: 'CSS', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Which tag is used to define an internal style sheet in HTML?',
        answers: [
            { text: '<style>', correct: true },
            { text: '<link>', correct: false },
            { text: '<head>', correct: false },
            { text: '<body>', correct: false }
        ]
    },
    {
        question: 'Which attribute is used to include an external JavaScript file?',
        answers: [
            { text: 'href', correct: false },
            { text: 'rel', correct: false },
            { text: 'src', correct: true },
            { text: 'script', correct: false }
        ]
    },
    {
        question: 'Which of the following is NOT a valid CSS property?',
        answers: [
            { text: 'font-size', correct: false },
            { text: 'text-color', correct: true },
            { text: 'border-radius', correct: false },
            { text: 'background-color', correct: false }
        ]
    },
    {
        question: 'How do you write a comment in JavaScript?',
        answers: [
            { text: '// This is a comment', correct: true },
            { text: '<!-- This is a comment -->', correct: false },
            { text: '/* This is a comment */', correct: false },
            { text: '# This is a comment', correct: false }
        ]
    }
];
