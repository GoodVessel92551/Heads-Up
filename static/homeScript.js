const subjectButtons = document.getElementById("subjectButtons")
var subjects = []

fetch("/static/words.json")
  .then(response => response.json())
  .then(data => {
    Object.keys(data).forEach(key => {
        var a = document.createElement("a")
        a.href = "/topic?topic=" + key
        a.classList.add("button")
        a.innerHTML = key
        subjectButtons.appendChild(a)
    });
    console.log(subjects)
  });