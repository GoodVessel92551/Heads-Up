const subjectButtons = document.getElementById("subjectButtons")
var subjects = []
var subjectData
fetch("/static/words.json")
  .then(response => response.json())
  .then(data => {
    subjectData = data
    resetSubjects()
  })


const resetSubjects = () => {
  subjectButtons.innerHTML = ""
  Object.keys(subjectData).forEach(key => {
    var a = document.createElement("button")
    var icon = document.createElement("i")
    var text = document.createElement("span")
    text.innerText = key
    icon.classList.add("ph", "ph-"+subjectData[key].icon)
    a.appendChild(icon)
    a.appendChild(text)
    a.addEventListener("click", () => {
        topics = subjectData[key].topics
        subjectButtons.innerHTML = '<button onclick="resetSubjects()" class="button"><i class="ph ph-arrow-left"></i>Back</button>'
        topics.forEach(topic => {
          console.log(topic)
            var topicLink = document.createElement("a")
            topicLink.innerText = topic.title
            topicLink.classList.add("button")
            topicLink.href = "/game?topic=" + key + "&subtopic=" + topic.title
            subjectButtons.appendChild(topicLink)
        })
    })
    a.classList.add("button")
    subjectButtons.appendChild(a)

});
}
