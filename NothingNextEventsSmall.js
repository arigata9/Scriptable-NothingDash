// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: calendar-minus;

// Typeset
let font_name = "Nothing Font (5x7) Regular";
let Heading_size = 17;
let normal_size = 10;

let bg = Color.black();
let fg = Color.white();

// Change these to the names of your calendars
let workCalendar = "Work";
let privateCalendar = "Private";

// The widget
let widget = await createWidget();
Script.setWidget(widget);
Script.complete();
widget.presentSmall();

async function createWidget() {
    let widget = new ListWidget();
    widget.backgroundColor = bg;
    widget.setPadding(10, 5, 5, 10);

    const stack = widget.addStack();
    stack.layoutVertically();
    stack.spacing = 3;

    // Get next work/personal calendar events
    let nextWorkEvent = await fetchNextCalendarEvent(workCalendar);
    let nextPersonalEvent = await fetchNextCalendarEvent(privateCalendar);


    // First line - heading
    let _first = stack.addText("Anstehende Termine");
    _first.font = new Font(font_name, Heading_size);
    _first.textColor = fg;

     stack.addSpacer(2);

    // Second line - normal
    let _second = stack.addText(getCalendarEventTitle(nextPersonalEvent, false));
    _second.font = new Font(font_name, normal_size);
    _second.textColor = fg;
    
    // Third line - normal
    let _third = stack.addText(getCalendarEventTitle(nextWorkEvent, true));
    _third.font = new Font(font_name, normal_size);
    _third.textColor = fg;

    stack.addSpacer();

    return widget;
}

//-------------------------------------
// Calendar Helper Functions
//-------------------------------------

/**
 * Fetch the next calendar event from the given calendar
 * 
 * @param {*} calendarName The calendar to get events from
 */
async function fetchNextCalendarEvent(calendarName) {
    const calendar = await Calendar.forEventsByTitle(calendarName);
    const events = await CalendarEvent.today([calendar]);
    const tomorrow = await CalendarEvent.tomorrow([calendar]);
  
    console.log(`Got ${events.length} events for ${calendarName}`);
    console.log(`Got ${tomorrow.length} events for ${calendarName} tomorrow`);
  
    const upcomingEvents = events.concat(tomorrow).filter(e => (new Date(e.endDate)).getTime() >= (new Date()).getTime());
  
    return upcomingEvents ? upcomingEvents[0] : null;
  }

/**
 * Given a calendar event, return the display text with title and time.
 * 
 * @param {*} calendarEvent The calendar event
 * @param {*} isWorkEvent Is this a work event?
 */
function getCalendarEventTitle(calendarEvent, isWorkEvent) {
    if (!calendarEvent) {
      return `No upcoming ${isWorkEvent ? 'work ' : ''}events`;
    }
  
    const timeFormatter = new DateFormatter();
    timeFormatter.locale = '';
    timeFormatter.useNoDateStyle();
    timeFormatter.useShortTimeStyle();
  
    const eventTime = new Date(calendarEvent.startDate);
  
    return `[${timeFormatter.string(eventTime)}] ${calendarEvent.title}`;
  }
