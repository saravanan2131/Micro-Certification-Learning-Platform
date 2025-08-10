document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const buttons = {
        dashboard: document.getElementById("dashboardBtn"),
        lessons: document.getElementById("lessonsBtn"),
        quiz: document.getElementById("quizBtn")
    };

    function showSection(sectionId) {
        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(sectionId).classList.add("active");
    }

    buttons.dashboard.addEventListener("click", () => showSection("dashboard"));
    buttons.lessons.addEventListener("click", () => showSection("lessons"));
    buttons.quiz.addEventListener("click", () => showSection("quiz"));

    // Sample lessons
    const lessonList = document.getElementById("lessonList");
    const lessons = [
        { title: "Excel Basics", content: "Learn formulas, charts, and data formatting." },
        { title: "JavaScript Fundamentals", content: "Understand variables, loops, and functions." },
        { title: "Resume Writing", content: "Craft a professional resume for job applications." }
    ];

    lessons.forEach(lesson => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${lesson.title}</strong>: ${lesson.content}`;
        lessonList.appendChild(li);
    });

    // Sample quiz
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = `
        <p>1. What does HTML stand for?</p>
        <input type="radio" name="q1" value="correct"> Hyper Text Markup Language<br>
        <input type="radio" name="q1" value="wrong"> High Tech Modern Language<br>
    `;

    document.getElementById("submitQuiz").addEventListener("click", () => {
        const answer = document.querySelector('input[name="q1"]:checked');
        if (answer && answer.value === "correct") {
            alert("Correct! You earned a certificate.");
            document.getElementById("certificatesEarned").textContent =
                parseInt(document.getElementById("certificatesEarned").textContent) + 1;
        } else {
            alert("Incorrect. Try again!");
        }
    });
});
