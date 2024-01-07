// Sélection des éléments du DOM
const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//const eventsArr = [
//    {
//        day: 16,
//        month: 12,
//        year: 2023,
//        events: [
//            {
//                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad",
//                time: "10:00 AM",
//            },
//            {
//                title: "Event 2",
//                time: "11:00 AM",
//            },
//        ],
//    },
//    {
//        day: 18,
//        month: 12,
//        year: 2023,
//        events: [
//            {
//                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad",
//                time: "10:00 AM",
//            },
//            {
//                title: "Event 2",
//                time: "11:00 AM",
//            },
//        ],
//    },
//];


// Définir un tableau vide
let eventsArr = [];

// Appelez get
getEvents();

// Fonction pour ajouter les jours

function initCalendar() {
    // Pour obtenir les jours du mois précédent et le mois en cours, tous les jours et les jours du mois suivant
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Mettre à jour la date en haut du calendrier
    date.innerHTML = months[month] + " " + year;

    // Ajouter des jours sur dom
    let days = "";

    // Jours du mois précédent
    for (let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // Jours du mois en cours
    for (let i = 1; i <= lastDate; i++) {

        // Test
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            )
            {
                event = true;
            }
        });

        // Si c'est aujourd'hui, ajouter la classe today
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {

            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            //If event found
            // Add active
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            }
            else {
                days += `<div class="day today active">${i}</div>`;
            }
        }

        // Ajouter le reste tel quel
        else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            }
            else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }

    // Jours du mois suivant
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    // Ajouter Listner après l'initialisation du calendrier
    addListner();
}

initCalendar();

// Mois précédent
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// Mois suivant
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// Ajouter un écouteur d'événements à la précédente et à la suivante
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    // Autoriser uniquement les chiffres supprimer tout le reste
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        // Ajouter une barre oblique si deux nombres sont saisis
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        // Autorisez pas plus de 7 caractères
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // Si vous appuyez sur la touche Retour arrière
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

// Fonction pour aller à la date saisie

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // Une validation de date
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // Si la date est invalide
    alert("invalid date")
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    // Si clique à l'extérieur
    if(e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

// Autoriser seulement 50 caractères dans le titre

addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// Format de l'heure DE et A

addEventFrom.addEventListener("input", (e) => {
    // Supprimer tout le reste des numéros
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    // Si 2 numéros sont entrés, ajout automatique ":"
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    // Ne pas laisser l'utilisateur saisir plus de 5 caractères
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

// Pareil avec A
addEventTo.addEventListener("input", (e) => {
    // Supprimer tout le reste des numéros
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    // Si 2 numéros sont entrés, ajout automatique ":"
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    // Ne pas laisser l'utilisateur saisir plus de 5 caractères
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

// Fonction pour ajouter un auditeur quelques jours après le rendu

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            // Définir le jour en cours comme jour actif
            activeDay = Number(e.target.innerHTML);

            // Appeler l'actif après le clic
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            // Supprimer l'actif d'une journée déjà active
            days.forEach((day) => {
                day.classList.remove("active");
            });

            // Si le jour du mois précédent a cliqué sur aller au mois précédent et ajouter un actif
            if (e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    // Sélectionner tous les jours de ce mois
                    const days = document.querySelectorAll(".day");

                    // Après être allé au mois précédent, ajouter l'actif au clic
                    days.forEach((day) => {
                        if(
                            !day.classList.contains("prev-date") && 
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
                // Pareil avec les jours du mois suivant
            }
            else if (e.target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {
                    // Sélectionner tous les jours de ce mois
                    const days = document.querySelectorAll(".day");

                    // Après être allé au mois suivant, ajouter l'actif au clic
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else {
                // Jours restants du mois en cours
                e.target.classList.add("active");
            }
        });
    });
}

// Montrer les événements de la journée active et la date en haut
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Fonction pour afficher les événements de cette journée
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        // Obtenir uniquement les événements de la journée active
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            // Puis afficher l'événement sur le document
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <span class="material-icons-sharp">
                        circle
                        <span>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                </div>
                `;
            });
        }
    });

    // Si rien n'est trouvé
    if ((events === "")) {
        events = `
            <div class="no-event">
                <h3>No Events</h3>
            </div>
        `;
    }

    eventsContainer.innerHTML = events;
    // Enregistrer les événements lorsque l'événement de mise à jour est appelé
    saveEvents();
}

// Fonction pour ajouter des événements
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    const eventPassword = prompt("Entrez votre mot de passe :"); // Demander le mot de passe à l'utilisateur

    // Quelques validations
    if (
        eventTitle === "" ||
        eventTimeFrom === "" ||
        eventTimeTo === "" ||
        eventPassword === null
    ) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length != 2 ||
        timeToArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Format d'heure invalide");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
        password: eventPassword, // Stocker le mot de passe avec l'événement
    };

    let eventAdded = false;

    // Vérifier si eventsarr n'est pas vide
    if (eventsArr.length > 0) {
        // Vérifier si la journée en cours a déjà un événement, puis ajouter
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    // Si le tableau d'événements est vide ou si le jour en cours n'a pas d'événement, créer un nouveau
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    // Supprimer l'actif du formulaire d'ajout d'événement
    addEventContainer.classList.remove("active")
    // Dégager les terrains
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    // Afficher l'événement ajouté en cours
    updateEvents(activeDay);

    // Ajouter également une classe d'événement au jour nouvellement ajouté si ce n'est déjà fait
    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

function convertTime(time){
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

// Fonction pour supprimer des événements au clic
eventsContainer.addEventListener("click", (e) => {
    console.log("Clic sur eventsContainer");
    if (e.target.classList.contains("event")) {
        console.log("Clic sur un élément avec la classe 'event'");
        const eventTitleElement = e.target.querySelector(".event-title");

        // Vérifier si l'élément .event-title existe
        if (eventTitleElement) {
            const eventTitle = eventTitleElement.innerHTML;
            const enteredPassword = prompt("Entre votre mot de passe pour supprimer l'événement :"); // Demander le mot de passe à l'utilisateur
            console.log("Mot de passe entré :", enteredPassword);

            // Obtenir le titre de l'événement, puis rechercher dans le tableau par titre et supprimer
            eventsArr.forEach((event) => {
                if (
                    event.day === activeDay &&
                    event.month === month + 1 &&
                    event.year === year
                ) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            // Vérifier le mot de passe avant de supprimer l'événement
                            if (enteredPassword === item.password) {
                                console.log("MMot de passe correct. Suppression de l'événement.");
                                event.events.splice(index, 1);
                            }
                            else {
                                console.log("Mot de passe incorrect. Impossible de supprimer l'événement.");
                                alert("Mot de passe incorrect. Impossible de supprimer l'événement.");
                            }
                        }
                    });

                    // S'il ne reste aucun événement ce jour-là, supprimer la journée complète
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                        // Après avoir supprimé la journée complète, supprimer également la classe active de cette journée
                        const activeDayElem = document.querySelector(".day.active");
                        if (activeDayElem.classList.contains("event")) {
                            activeDayElem.classList.remove("event");
                        }
                    }
                }
        
            });
            // Après la suppression de l'événement, mise à jour du tableau
            updateEvents(activeDay);
        } 
        else {
            console.error("L'élément .event-title n'existe pas.");
        }
    }
});

// Stocker les événements dans le stockage local
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem("events") != null) {
        return;
    }

    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}