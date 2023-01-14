const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const rightAnswers = document.querySelector(".rigth-answers");
const informationalText = document.querySelector(".informational-text");
const linkSource = document.querySelector(".link-wikepidea");

let recommancer = document.querySelector(".recombtn");
let recommancer2 = document.querySelector(".recombtn2");

let goQuestionAnswerText = document.querySelector(".go-question-answer-text");
const goAnswerInformationText = document.querySelector(".go-answer-information-text")

const finalResult = document.querySelector(".final-result")

const questionLimit = 10;

let questionConter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let round = 0;

let pastquestions = [];


//push question into availableQuestion Array
function setAvailableQuestion() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}



// set question number and question and options
function getNewQuestion() {
    // console.log(availableQuestions)
    // set question number
    questionNumber.innerHTML = "Question " + (questionConter + 1) + " sur " + questionLimit;
    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    /////////////////////////////////////////
    goQuestionAnswerText.innerHTML +=
        '<div class="go-question-text">' + currentQuestion.q +
        '<div class="go-answer-information-text">' +
        '<div class="go-answer-text">' + currentQuestion.options[currentQuestion.answer] + '</div>' +
        '<button id="' + quiz.indexOf(currentQuestion) + '" class="go-information-text" onclick="openinfotab(id)">i</button>' +
        '</div>' +
        '</div>'

    /////////////////////////////////////////

    ///////////////////////////////////////
    // get the position of the questionIndex from the availableQuestion
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the availableQuestion Array so that the question do not repeate 
    availableQuestions.splice(index1, 1);
    // set options
    // get length of options
    const optionLen = currentQuestion.options.length
        // push options into availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in HTML
    for (let i = 0; i < optionLen; i++) {
        // random options
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optonIndex' from the avalableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the 'optonIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionConter++
}

function openinfotab(id) {
    let infoAnswers = document.getElementById("infoanswers");
    let textInfo = document.querySelector(".textinfo");
    textInfo.innerHTML = quiz[id].text;
    linkSource.innerHTML = "<a target='_blank' href='" + quiz[id].linkWeb + "'>Source:" + quiz[id].source + "</a>";
    showinfo()
}


function getResult(element) {
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add("correct");
        // add the indicator to the correct mark 
        updateAnswerIndicator("correct")
        correctAnswers++;
        // console.log("correct: " + correctAnswers)

    } else {
        // set the red color to the incorrect option 
        element.classList.add("wrong");
        //  add the indicator to the incorrect mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect, show the correct option by adding green color to the corrcet one 
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersindicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionConter - 1].classList.add(markType)
}

function next() {
    if (questionConter === questionLimit) {
        // console.log("quiz over");
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide quiz quizbox
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function simpleReturn() {
    // show answers box
    rightAnswers.classList.remove("hide")
        // hide info text box
    informationalText.classList.add("hide");
}

function showinfo() {
    // show info text
    informationalText.classList.remove("hide");
    // hide answers text
    rightAnswers.classList.add("hide")
}

function quizResult() {
    finalResult.innerHTML = correctAnswers + " /" + questionLimit;
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / questionLimit) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz() {
    questionConter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}


function tryAgainQuiz() {

    // hide the resultBox
    rightAnswers.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function showRightAnswers() {
    // hide the result box
    resultBox.classList.add("hide");
    // show the rigth answers box 
    rightAnswers.classList.remove("hide");
}

function goToHome() {
    // hide result Box
    rightAnswers.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// #### STARTING POINT ####

function startQuiz() {

    goQuestionAnswerText.innerHTML = '';
    resultBox.classList.add("hide");
    //hide home box
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide");
    // hide result Box
    rightAnswers.classList.add("hide");
    resetQuiz();
    // first we will set all questions in availableQuestions Array
    setAvailableQuestion();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // to create indicator of answers
    answersindicator();
    round++;
    verifyround()
}

function verifyround() {
    if (round === 2) {
        recommancer.removeAttribute("onclick");
        recommancer.textContent = 'À bientôt pour un nouveau quiz';
        recommancer2.removeAttribute("onclick");
        recommancer2.textContent = 'À bientôt pour un nouveau quiz';
    }
}

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}