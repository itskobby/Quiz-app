const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const studentNameElement = document.getElementById('student-name');
const studentNumberElement = document.getElementById('student-number');




let shuffledQuestions, currentQuestionIndex;
let score = 0;
let studentName = '';
let studentNumber = '';
let quizEnded = false;





function startTimer(duration, callback) {
  let timeLeft = duration;
  const intervalId = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0 || quizEnded) {
      clearInterval(intervalId);
      callback();
    } else {
      timeLeft--;
    }
  }, 1000);
}


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  // Get the values of student name and number
  studentName = studentNameElement.value;
  studentNumber = studentNumberElement.value;
  // Hide the start button and show the next button
  startButton.style.display="none";
  nextButton.style.display="block";
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  quizEnded = false; 
  timerElement.style.display = 'block';
  questionContainer.classList.remove('hide');
  setNextQuestion();

  /*const duration = 30; // in seconds
  startTimer(duration, () => {
    // callback function to be executed when timer ends
    feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
feedbackElement.classList.remove('hide');

 //renderChart();

 updateScoreChart()
  });*/ 
  startTimer(30, endQuiz);
  
}


function endQuiz() {
  quizEnded = true; // added this line
  timerElement.textContent = 'Time up!';
  nextButton.style.display = 'none';
  feedbackElement.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
  updateScoreChart();
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
      feedbackElement.classList.remove('hide');
      nextButton.classList.add('hide');
    }
    
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
      score++;
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }


  /*function renderChart() {
    const data = {
      labels: ['Correct Answers', 'Wrong Answers'],
      datasets: [
        {
          label: 'Quiz Results',
          data: [score, questions.length - score],
          backgroundColor: ['#4CAF50', '#F44336'],
        },
      ],
    };


    const config = {
      type: 'pie',
      data,
    };
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, config);
  }
  */
  function updateScoreChart() {
    const chartElement = document.getElementById('chart');
    const chart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: [`${studentName} (${studentNumber}) Correct`, `${studentName} (${studentNumber}) Wrong`],
        datasets: [{
          label: 'Score',
          data: [score, questions.length - score],
          backgroundColor: [
            'rgba(75, 192, 75, 0.6)',
            'rgba(255, 99, 71, 0.6)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Score Chart'
          }
        }
      }
    });
    document.getElementById('score-chart').innerHTML = chart.canvas.outerHTML;
  }
  

  
  const questions = [  {    question: 'What is 9 + 2?',    answers: [      { text: '11', correct: true },      { text: '22', correct: false }    ]
},
{
question :'What is the largest country in the world by land area?',
answers:[
 { text: 'Russia', correct: true },
 { text: 'China', correct: false },
 { text: 'United States', correct: false },
 { text: 'Canada', correct: false }
]
 },

{
question: 'What is the largest planet in our solar system?',
answers: [
 { text: 'Jupiter', correct: true },
 { text: 'Saturn', correct: false },
 { text: 'Uranus', correct: false },
 { text: 'Neptune', correct: false }
]
},

{
  question:'Who is the founder of SpaceX?',
  answers:[
{ text: 'Elon Musk', correct: true },
{ text: 'Jeff Bezos', correct: false },
{ text: 'Richard Branson', correct: false },
{ text: 'Bill Gates', correct: false }
]
},
{
  question: 'Who is the best football player in the world?',
  answers: [
    { text: 'Lionel Messi', correct: true },
    { text: 'Cristiano Ronaldo', correct: true },
    { text: 'Neymar Jr.', correct: true },
    { text: 'Kylian Mbappé', correct: true }
  ]
},
{
question: 'Who wrote the novel "To Kill a Mockingbird" ?',
 answers: [
 { text: 'Harper Lee', correct: true },
 { text: 'Ernest Hemingway', correct: false },
 { text: 'F. Scott Fitzgerald', correct: false },
 { text: 'Mark Twain', correct: false }
 ]
},

{
question: 'What is the capital city of France?',
 answers:[
  { text: 'Paris', correct: true },
  { text: 'Madrid', correct: false },
  { text: 'Rome', correct: false },
  { text: 'Berlin', correct: false }
 ]
},

{
question: 'What is the highest mountain in the world?',
 answers:[
 { text: 'Mount Everest', correct: true },
 { text: 'Mount Kilimanjaro', correct: false },
 { text: 'Mount Denali', correct: false },
 { text: 'Mount Fuji', correct: false }
 ]
},
{
question: 'Who directed the movie "Inception"?',
 answers:[
   { text: 'Christopher Nolan', correct: true },
   { text: 'Steven Spielberg', correct: false },
   { text: 'Quentin Tarantino', correct: false },
   { text: 'Martin Scorsese', correct: false }
 ]
},
{
question:'Who played the character of Iron Man in the Marvel Cinematic Universe?',
 Answers:[
{ text: 'Robert Downey Jr.', correct: true },
{ text: 'Chris Evans', correct: false },
{ text: 'Mark Ruffalo', correct: false },
{ text: 'Chris Hemsworth', correct: false }
 ]
}
  ]