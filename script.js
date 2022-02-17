"strict mode"

const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];

//variable declaration for total questions count and to set timer.
var count = 0;
var str = '';
var cnt = 50;

//variable declaration for getting quiz page elements tag.
var questionDiv = document.getElementById("quiz-que");
var optionsDiv = document.getElementById("options");
var resultDiv = document.getElementById("result");

//function to build quiz section
var buildQuiz = () => {
    resultDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
    var question = questions[count];

    //if statement if question answered incorrect.
    if (isCorrect == false) {
        cnt -= 10;
        console.log(cnt);
    }

    questionDiv.innerText = question.questionText;

    //forEach loop for getting options for each question.

    question.options.forEach(opt => { str += "<Div class='options' onClick='checkAns(this)'>" + opt + "</Div>" }
    );
    optionsDiv.innerHTML = str;
    str = '';

}

//function for creating submit section.
var submitPage = () => {
    document.getElementById("submit-span").innerHTML = points + ".";
    document.getElementById("submit-span2").innerHTML = "Enter initials: " + " <input type='text' id='init-id'/> " + "<button class='submit-btn' onclick=elementHider('Submitted')>Submit</button>"
}

//check if pointsTable_LS is null or not
if (localStorage.getItem("pointsTable_LS") == null) {
    localStorage.setItem("pointsTable_LS", '[]');
}

//function to store user's score into Local Storage
var storeIntoLocalStorage = () => {

    //to get user's score after submission
    var scoreList = {
        init: document.getElementById("init-id").value,
        score: points
    }

    var new_pointsTableData = [];
    new_pointsTableData = scoreList;

    //to get old data from localStorage
    var old_pointsTableData = JSON.parse(localStorage.getItem("pointsTable_LS"));
    old_pointsTableData.push(new_pointsTableData);

    //save old + new data to localStorage
    localStorage.setItem('pointsTable_LS', JSON.stringify(old_pointsTableData));
}

//function to clear highscores
var clearHighscores = () => {
    localStorage.setItem("pointsTable_LS", '[]');
    window.location.reload();
}
//function to create Highscore view section
var getHighscores = () => {

    document.getElementById("content-id").innerHTML = '';
    let LS_data = JSON.parse(localStorage.getItem("pointsTable_LS"));
    console.log(LS_data);
    let getHighscoreTag = document.getElementById("content-id");

    getHighscoreTag.innerHTML = "<h2>Highscore</h2> <ol id='myOl'></ol> <span><button class='highscore-btn' onclick='window.location.reload();'>Go Back</button> <button class='highscore-btn' onclick=clearHighscores()>Clear Highscore</button></span>";

    LS_data.forEach(currData => {
        var li = document.createElement("li");
        var text = document.createTextNode(currData.init + " - " + currData.score);
        li.appendChild(text);
        document.getElementById("myOl").appendChild(li);
    });
}

//function to hide and show html elements according to functionallity.
var elementHider = (elePara) => {
    if (elePara === "Start Quiz") {
        let tempClassName1 = document.getElementById("containerId1");
        tempClassName1.className += " hide-div";

        let tempClassName2 = document.getElementById("containerId2");
        tempClassName2.classList.remove("hide-div");

        document.getElementById("leaderboard").removeAttribute("onclick");
    }
    else {
        if (elePara === "Test Finished") {
            submitPage();
            setTimeout(function () {
                tempClassName2 = document.getElementById("containerId2");
                tempClassName2.className += " hide-div";

                let tempClassName3 = document.getElementById("containerId3");
                tempClassName3.classList.remove("hide-div");
            }, 1000);
        } else {
            if (elePara === "Submitted") {
                storeIntoLocalStorage();
                count = 0;
                isCorrect = true;
                tempClassName2 = document.getElementById("containerId2");
                tempClassName2.className += " hide-div";

                tempClassName3 = document.getElementById("containerId3");
                tempClassName3.className += " hide-div";

                tempClassName1 = document.getElementById("containerId1");
                tempClassName1.classList.remove("hide-div");

                document.getElementById("leaderboard").setAttribute("onclick", "elementHider('View Highscore')");
            } else {
                tempClassName1 = document.getElementById("containerId1");
                tempClassName1.className += " hide-div";

                tempClassName2 = document.getElementById("containerId2");
                tempClassName2.className += " hide-div";

                getHighscores();

                tempClassName3 = document.getElementById("containerId3");
                tempClassName3.classList.remove("hide-div");
            }
        }
    }
}

//function to execute after user click 'Start Quiz' Button.
var startQuiz = () => {
    if (count == 0) {
        cnt = 50;
        elementHider("Start Quiz");
        buildQuiz();
    }
    //setInterval function for the 50 sec timer
    var interval = setInterval(function () {
        document.getElementById('timer').innerHTML = cnt;
        cnt--;
        if (cnt <= -1 || count == questions.length) {
            clearInterval(interval);
            window.alert("Quiz Completed!");
            document.getElementById('timer').innerHTML = '';
        }
    }, 1000);
}

//variable declaration and function definition to check whether  given answer is correct or not.
var points = 0;
var isCorrect = true;

var checkAns = (ele) => {
    var res = '';
    res = "<hr/>";
    if (questions[count].answer === ele.innerText) {
        res += "<p>Correct!</p>";
        points += 10;
    } else {
        res += "<p>Incorrect!</p>";
        // points -= 10;
        isCorrect = false;
    }
    console.log(resultDiv.innerHTML);
    resultDiv.innerHTML = res;
    console.log(resultDiv.innerHTML);

    count++;

    //check if all the questions are done or not.
    if (count == questions.length) {
        elementHider("Test Finished");
    } else {
        setTimeout(function () { buildQuiz() }, 1000);
    }
}
