let birthFacts = {};
fetch("birth-data.json")
.then(response => response.json())
.then(data => {

    birthFacts = data;

});
function animateValue(id, endValue, duration = 1200) {

    const element = document.getElementById(id);

    const startValue = 0;

    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const currentValue = Math.floor(progress * endValue);

        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}
function revealCards(){

    const cards = document.querySelectorAll(
        ".card, .small-card, .stat-card"
    );

    // Remove previous animation
    cards.forEach(card => card.classList.remove("show"));

    // Replay animation
    cards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 150);

    });

}
const button = document.getElementById("calculate");

button.addEventListener("click", calculateAge);


function calculateAge() {

    const dob = document.getElementById("dob").value;

    if (dob === "") {
        alert("Please select your birthday.");
        return;
    }

    const birthDate = new Date(dob);
    const birthYear = birthDate.getFullYear();

const info = birthFacts[birthYear];

if(info){

document.getElementById("movie").textContent = info.movie;
document.getElementById("song").textContent = info.song;
document.getElementById("phone").textContent = info.phone;
document.getElementById("car").textContent = info.car;
document.getElementById("game").textContent = info.game;
document.getElementById("console").textContent = info.console;
document.getElementById("os").textContent = info.os;
document.getElementById("population").textContent = info.population;
document.getElementById("technology").textContent = info.technology;

}else{

const ids = [

"movie",
"song",
"phone",
"car",
"game",
"console",
"os",
"population",
"technology"

];

ids.forEach(id=>{

document.getElementById(id).textContent="Coming Soon";

});

}
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Current Age
    document.getElementById("age").innerHTML =
        `${years} Years<br>${months} Months<br>${days} Days`;

    // Total Days Alive
    const difference = today - birthDate;
    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

    animateValue("days", totalDays);

    // Birthday Countdown
    const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const countdown = Math.ceil(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    document.getElementById("birthday").textContent =
        countdown + " Days";

    // ==========================
    // LIFE JOURNEY
    // ==========================

    // Sunrises Seen
    animateValue("sunrises", totalDays);

    // Estimated Heartbeats
    animateValue(
    "heartbeats",
    Math.round(totalDays * 24 * 60 * 70)
);
    // Estimated Breaths
    animateValue(
    "breaths",
    Math.round(totalDays * 24 * 60 * 16)
);

    // Trips Around the Sun
    animateValue("earthTrips", years);

    // Full Moons Witnessed
    animateValue(
    "moons",
    Math.floor(totalDays / 29.53)
);
    // Birthdays Celebrated
    animateValue("birthdays", years);

    // ==========================
    // SHOW RESULTS
    // ==========================

    document.getElementById("results").style.display = "block";

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
revealCards();
}
document.getElementById("downloadCard")
.addEventListener("click",()=>{

    alert(
"🚀 Share Card Export is coming in Life Dashboard V2.5!"
    );

});