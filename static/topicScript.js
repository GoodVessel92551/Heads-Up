const subjectTitle = document.getElementById("subjectTitle")
const topicsContainer = document.getElementById("topicsContainer")

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");
subjectTitle.textContent = topic;


const subjectButtons = document.getElementById("subjectButtons")
var subjects = []

fetch("/static/words.json")
  .then(response => response.json())
  .then(data => {
    Object.keys(data).forEach(key => {
        var a = document.createElement("a")
        a.href = "/topic/?topic=" + key
        a.classList.add("button")
        a.innerHTML = key
        subjectButtons.appendChild(a)
    });

    Object.keys(data[topic]).forEach(key => {
        var title = key
        var about = data[topic][key].about
        var a = document.createElement("a")
        var strong = document.createElement("strong")
        var p = document.createElement("p")
        a.href = "/game?topic=" + topic + "&subtopic=" + key
        strong.textContent = title
        p.textContent = about
        a.appendChild(strong)
        a.appendChild(p)
        topicsContainer.appendChild(a)
    })
    console.log(subjects)
  });