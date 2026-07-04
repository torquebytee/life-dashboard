const button = document.getElementById("calculate");

button.addEventListener("click", calculateAge);

function calculateAge() {

    const dob = document.getElementById("dob").value;

    if (dob === "") {
        alert("Please select your birthday.");
        return;
    }

    const birthDate = new Date(dob);
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

    document.getElementById("days").textContent =
        totalDays.toLocaleString();

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
    document.getElementById("sunrises").textContent =
        totalDays.toLocaleString();

    // Estimated Heartbeats
    document.getElementById("heartbeats").textContent =
        Math.round(totalDays * 24 * 60 * 70).toLocaleString();

    // Estimated Breaths
    document.getElementById("breaths").textContent =
        Math.round(totalDays * 24 * 60 * 16).toLocaleString();

    // Trips Around the Sun
    document.getElementById("earthTrips").textContent =
        years;

    // Full Moons Witnessed
    document.getElementById("moons").textContent =
        Math.floor(totalDays / 29.53);

    // Birthdays Celebrated
    document.getElementById("birthdays").textContent =
        years;

    // ==========================
    // SHOW RESULTS
    // ==========================

    document.getElementById("results").style.display = "block";

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });

}