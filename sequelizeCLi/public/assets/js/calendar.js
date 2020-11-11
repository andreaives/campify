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
    customButtons: {
      addEventButton: {
        text: "Add Event",
        click: function() {
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00');

          if (!isNaN(date.valueOf())) {
            calendar.addEvent({
              title: "Camping",
              start: date,
              allDay: true
            });
            alert("Event Added")
          } else{
            alert("Not a valid Date")
          }
        }
      }
  },
    editable: true,
    dayMaxEvents: true, // when too many events in a day, show the popover
    events: "https://fullcalendar.io/demo-events.json?overload-day",
    eventColor: "#378006",
    eventDisplay: "auto",

  });

  calendar.render();
});