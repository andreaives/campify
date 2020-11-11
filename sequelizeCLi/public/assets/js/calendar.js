$(function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: 'dayGridMonth',
    initialDate: '2020-11-10',
    headerToolbar: {
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    dayMaxEvents: true, // when too many events in a day, show the popover
    events: "https://fullcalendar.io/demo-events.json?overload-day",
    eventColor: "#378006",
    eventDisplay: "auto",

  });

  calendar.render();
});