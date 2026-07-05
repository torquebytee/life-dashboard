/* ==========================================================
   TORQUEBYTEE
   LIFE DASHBOARD V2
========================================================== */

/* ==========================================================
LOAD BIRTH DATA
========================================================== */

let birthFacts = {};

fetch("birth-data.json")
.then(res => res.json())
.then(data => {

    birthFacts = data;

})
.catch(err=>{

    console.error("Birth data could not be loaded.",err);

});

/* ==========================================================
DOM ELEMENTS
========================================================== */

const dobInput =
document.getElementById("dob");

const calculateBtn =
document.getElementById("calculate");

const results =
document.getElementById("results");

/* ==========================================================
NUMBER ANIMATION
========================================================== */

function animateValue(id,value,duration=1200){

    const element=document.getElementById(id);

    if(!element) return;

    const start=performance.now();

    function update(time){

        const progress=Math.min(
            (time-start)/duration,
            1
        );

        element.textContent=
        Math.floor(progress*value).toLocaleString();

        if(progress<1){

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

/* ==========================================================
CARD REVEAL
========================================================== */

function revealCards(){

    const cards=document.querySelectorAll(

        ".card,.small-card,.stat-card,.capsule-card,.world-card,.community-card"

    );

    cards.forEach(card=>{

        card.classList.remove("show");

    });

    cards.forEach((card,index)=>{

        setTimeout(()=>{

            card.classList.add("show");

        },index*90);

    });

}

/* ==========================================================
HELPERS
========================================================== */

function setText(id,value){

    const el=document.getElementById(id);

    if(el){

        el.textContent=value;

    }

}

function showResults(){

    results.style.display="block";

    results.scrollIntoView({

        behavior:"smooth"

    });

    revealCards();

}

/* ==========================================================
BUTTON
========================================================== */

calculateBtn.addEventListener(

    "click",

    calculateAge

);
/* ==========================================================
AGE CALCULATION
========================================================== */

function calculateAge(){

    const dob = dobInput.value;

    if(!dob){

        alert("Please select your birthday.");

        return;

    }

    const birthDate = new Date(dob);

    const today = new Date();

    /* ==========================
       CURRENT AGE
    ========================== */

    let years =
    today.getFullYear() -
    birthDate.getFullYear();

    let months =
    today.getMonth() -
    birthDate.getMonth();

    let days =
    today.getDate() -
    birthDate.getDate();

    if(days < 0){

        months--;

        const previousMonth = new Date(

            today.getFullYear(),

            today.getMonth(),

            0

        );

        days += previousMonth.getDate();

    }

    if(months < 0){

        years--;

        months += 12;

    }

    document.getElementById("age").innerHTML =

        `${years} Years<br>${months} Months<br>${days} Days`;

    /* ==========================
       TOTAL DAYS ALIVE
    ========================== */

    const difference =

    today - birthDate;

    const totalDays = Math.floor(

        difference /

        (1000*60*60*24)

    );

    animateValue(

        "days",

        totalDays

    );

    /* ==========================
       NEXT BIRTHDAY
    ========================== */

    const nextBirthday = new Date(

        today.getFullYear(),

        birthDate.getMonth(),

        birthDate.getDate()

    );

    if(nextBirthday < today){

        nextBirthday.setFullYear(

            today.getFullYear()+1

        );

    }

    const birthdayCountdown = Math.ceil(

        (nextBirthday - today) /

        (1000*60*60*24)

    );

    setText(

        "birthday",

        birthdayCountdown + " Days"

    );

    /* ==========================
       LIFE JOURNEY
    ========================== */

    animateValue(

        "sunrises",

        totalDays

    );

    animateValue(

        "heartbeats",

        Math.round(

            totalDays *

            24 *

            60 *

            70

        )

    );

    animateValue(

        "breaths",

        Math.round(

            totalDays *

            24 *

            60 *

            16

        )

    );

    animateValue(

        "earthTrips",

        years

    );

    animateValue(

        "moons",

        Math.floor(

            totalDays /

            29.53

        )

    );

    animateValue(

        "birthdays",

        years

    );

    /* ==========================
       LOAD BIRTH FACTS
    ========================== */

    loadBirthFacts(

        birthDate.getFullYear()

    );

    /* ==========================
       SHOW RESULTS
    ========================== */

    showResults();

}
/* ==========================================================
TIME CAPSULE
========================================================== */

function loadBirthFacts(year){

    const info = birthFacts[year];

    const fields = [

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

    /* ==========================
       NO DATA AVAILABLE
    ========================== */

    if(!info){

        fields.forEach(field=>{

            setText(field,"Coming Soon");

        });

        setText(

            "birthPopulation",

            "Coming Soon"

        );

        setText(

            "populationGrowth",

            "Coming Soon"

        );

        document.getElementById(

            "generationList"

        ).innerHTML=

        "<li>Historical data is being added.</li>";

        return;

    }

    /* ==========================
       CAPSULE DATA
    ========================== */

    fields.forEach(field=>{

        setText(

            field,

            info[field]

        );

    });

    /* ==========================
       WORLD SNAPSHOT
    ========================== */

    setText(

        "birthPopulation",

        info.population

    );

    const todayPopulation = 8.2;

    const increase = (

        todayPopulation -

        parseFloat(info.population)

    ).toFixed(2);

    setText(

        "populationGrowth",

        increase + " Billion"

    );

    /* ==========================
       GENERATION LIST
    ========================== */

    const generationList =

    document.getElementById(

        "generationList"

    );

    generationList.innerHTML="";

    if(info.generation){

        info.generation.forEach(item=>{

            generationList.innerHTML+=

            `<li>${item}</li>`;

        });

    }else{

        generationList.innerHTML=

        "<li>Coming Soon</li>";

    }

}
/* ==========================================================
DOWNLOAD DASHBOARD
========================================================== */


/* ==========================================================
TORQUEBYTEE
UTILITY FUNCTIONS
========================================================== */

/* --------------------------
Current Year
-------------------------- */

document.querySelectorAll(".currentYear").forEach(el=>{

    el.textContent = new Date().getFullYear();

});

/* --------------------------
Enter Key Support
-------------------------- */

dobInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        calculateAge();

    }

});

/* --------------------------
Future Date Protection
-------------------------- */

const todayDate = new Date()
.toISOString()
.split("T")[0];

dobInput.setAttribute(
    "max",
    todayDate
);

/* --------------------------
Image Loading Safety
-------------------------- */

window.addEventListener("load",()=>{

    console.log(

        "✅ TorqueBytee Life Dashboard Loaded."

    );

});

/* --------------------------
JSON Loading Check
-------------------------- */

calculateBtn.addEventListener("click",()=>{

    if(Object.keys(birthFacts).length===0){

        console.warn(

            "Birth data still loading..."

        );

    }

});

/* --------------------------
Developer Signature
-------------------------- */

console.log(`

████████╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███████╗
╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝
   ██║   ██║   ██║██████╔╝██║   ██║██║   ██║█████╗
   ██║   ██║   ██║██╔══██╗██║▄▄ ██║██║   ██║██╔══╝
   ██║   ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████╗
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝

Life Dashboard V2

Powered by TORQUEBYTEE

Developed by Shareyar

`);
