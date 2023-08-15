// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: clock;

// Typeset
let font = new Font("Nothing Font (5x7) Regular", 40);

let backgroundColor = Color.black();
let foregroundColor = Color.white();

// The widget
let widget = createWidget();
Script.setWidget(widget);
Script.complete();
widget.presentSmall();

function createWidget() {
    let widget = new ListWidget();
    widget.backgroundColor = backgroundColor;

    // First line
    let _first = widget.addText(formatHours());
    _first.font = font;
    _first.textColor = foregroundColor;
    _first.centerAlignText();

    let _spacer = widget.addText("- -");
    _spacer.font = font;
    _spacer.textColor = foregroundColor;
    _spacer.centerAlignText();

    // Second line
    let _second = widget.addText(formatMinutes());
    _second.font = font;
    _second.textColor = foregroundColor;
    _second.centerAlignText();

    return widget;
}


// Time helper functions
function formatHours() {
    let date = new Date();
    let hours = date.getHours();
    hours = hours.toString();
    
    if(hours.length == 1) {
        hours = "0" + hours;
        return hours;
    }
    else {
        return hours;
    }
}
function formatMinutes() {
    let date = new Date();
    let mins = date.getMinutes();
    mins = mins.toString();
    
    if(mins.length == 1) {
        mins = "0" + mins;
        return mins;
    }
    else {
        return mins;
    }
    
    return mins.toString();
}
