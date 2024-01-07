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

// Initialisation des variables liées à la date
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// Tableau des noms des mois
const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

// Tableau pour stocker les événements
let eventsArr = [];

// Fonction pour initialiser le calendrier
function initCalendar() {
    // Calcul du premier jour, du dernier jour et d'autres informations liées au mois en cours
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevlastDay = new Date(year, month, 0);
    const prevDays = prevlastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Mettre à jour le mois et l'année affichés
    date.innerHTML = months[month] + " " + year;

    // Générer le HTML pour les jours dans le calendrier
    let days = "";

    // Ajouter les jours du mois précédent
    for (let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // Ajouter les jours du mois en cours
    for (let i = 1; i <= lastDate; i++){
        // Vérifier si le jour a un événement
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

        // Vérifier s'il s'agit du jour actuel
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            // Ajouter la classe active et la classe d'événement s'il y a un événement
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            }
            else {
                days += `<div class="day today active">${i}</div>`;
            }
        }
        else {
            // Ajouter la classe d'événement s'il y a un événement
            if (event) {
                days += `<div class="day event">${i}</div>`;
            }
            else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }

    // Ajouter les jours du mois suivant
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    // Mettre à jour le conteneur des jours avec le HTML généré
    daysContainer.innerHTML = days; 

    // Ajouter des écouteurs d'événements aux jours
    addListener();
}

// Appeler la fonction d'initialisation
initCalendar();

// Fonction pour passer au mois précédent
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// Fonction pour passer au mois suivant
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// Écouteurs d'événements pour les boutons précédent et suivant
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Écouteur d'événements pour le bouton "Aujourd'hui"
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

// Écouteur d'événements pour l'entrée de date
dateInput.addEventListener("keyup", (e) => {
    // Formater l'entrée de date
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }

    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

// Écouteur d'événements pour le bouton "Aller à la date"
gotoBtn.addEventListener("click", gotoDate);

// Fonction pour aller à une date spécifique
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = Number(dateArr[1]);
            initCalendar();
            return;
        }
    }

    alert("Date invalide");
}

// Sélection d'autres éléments du DOM
const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

// Écouteurs d'événements pour afficher/masquer le conteneur d'ajout d'événement
addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

// Écouteur d'événements pour fermer le conteneur d'ajout d'événement si on clique à l'extérieur
document.addEventListener("click", (e) => {
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove("active");
    }
});

// Écouteurs d'événements pour la validation des champs dans le formulaire d'ajout d'événement
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");

    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }

    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");

    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }

    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

// Fonction pour ajouter des écouteurs d'événements aux jours du calendrier
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            activeDay = Number(e.target.innerHTML);

            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            days.forEach((day) => {
                day.classList.remove("active");
            });

            if (e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");

                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else if (e.target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");

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
                e.target.classList.add("active");
            }
        });
    });
}

// Fonction pour obtenir le jour actif
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Fonction pour mettre à jour les événements
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
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

    if ((events === "")) {
        events = `
            <div class="no-event">
                <h3>Aucun événement</h3>
            </div>
        `;
    }

    eventsContainer.innerHTML = events;
    saveEvents();
}

// Écouteur d'événements pour le bouton d'ajout d'événement
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
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
        alert("Format de l'heure invalide");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;

    if (eventsArr.length > 0) {
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

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events : [newEvent]
        });
    }

    addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    updateEvents(activeDay);

    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

// Fonction pour convertir le format de l'heure
function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

// Écouteur d'événements pour la suppression d'événements
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;

        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                      event.events.splice(index, 1);
                    }
                });

                if (event.events.length === 0) {
                  eventsArr.splice(eventsArr.indexOf(event), 1);

                  const activeDayElem = document.querySelector(".day-active");
                  if (activeDayElem.classList.contains("event")) {
                    activeDayElem.classList.remove("event");
                  }
                }
              }
        });

        updateEvents(activeDay);
    }
});

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  const storedEvents = localStorage.getItem("events");
  if (localStorage.getItem("events" === null)) {
    return;
  }

  const parsedEvents = JSON.parse(storedEvents);

  if (Array.isArray(parsedEvents)) {
    eventsArr.push(...parsedEvents);
  } 
  else {
    console.error("Invalid data format in localStorage")
  }
}

function setCurrentDate() {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
}

document.addEventListener('DOMContentLoaded', setCurrentDate);