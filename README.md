UltButtons
==========

Improves jQuery UI Checkbox/Radio Buttons functionality.

##Features

- Fixes a jQuery UI bug when double-clicking a checkbox/radio UI button in Firefox which makes the button display the opposite styling of its actual checked state;
- Allows for dragging the mouse while holding down the click and still triggering the state change. The original UI checkbox/radio buttons will cancel the event completely if you move the mouse more than ~3px while clicking, **UltButtons** triggers the state change even if you hold down the click, move the cursor out of the button and move it back in releasing the click (as an actual button would)!
- Turns UI checkbox/radio buttons's text **unselectable**, as an actual button.

##Support

IE6+ and all modern desktop browsers - Firefox, Chrome, Opera, Safari.

##Demo

Check out the [Project Page](http://ultcombo.github.com/UltButtons/)!

##How to use
Include jQuery, jQuery UI and then ultbuttons.js as follows:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/trontastic/jquery-ui.css" />
    <script src="ultbuttons1.01.min.js"></script>

Then just call the improved `.ultButton()`/`.ultButtonset()` instead of the native jQuery UI's `.button()`/`.buttonset()`.

##Notes

- Calling `.ultButton()`/`.ultButtonset()` on actual buttons won't have any improvement effect, as `.button()`/`.buttonset()` works as it should on actual buttons. This plugin is intended for checkbox/radio UI buttons, but calling it on actual buttons won't break anything either. `=]`
- **UltButtons** does not create any extra markup, instead, it works on top of the original jQuery UI `button`/`buttonset` methods.
- The plugin also does not use any globals.
- It adds 3 listeners to the `document`, so if you ever need to call `$(document).off('event')`, make sure to specify a named function handler to remove in the second parameter or use namespaced handlers, to avoid breaking the plugin functionality.
- The plugin requires jQuery 1.7 at least, recommended is 1.8+.

## Changelog

### 1.1
- disableSelection: Fixed unselectable property for nested elements inside buttons in Opera;
- disableSelection: Fixed userSelect for Firefox and Chrome when using jQuery 1.7;
//- buttonset/disableSelection: Fixed the buttonset method to don't assume that all labels inside a buttonset container are checkbox/radio button widgets;
- Unobstrusiveness: No longer utilizes `.data()` to store checked state; removed the `$.UltC` namespace. Still adds the `disableSelection` method to the jQuery object prototype for backwards compatibility with older versions which also exposed it.
overrides the UI's `$.ui.button.prototype._create`, meaning you can now call `.button()`/`.buttonset()` on elements normally after including the ultbuttons script and all accessibility improvements will be applied automatically. This deprecates the `$.fn.ultButton` and `$.fn.ultButtonset` which are now deprecated and serve as an alias to their counterpart `$.fn.button` and `$.fn.buttonset` methods.
add reenable on destroy method

### 1.01
- Micro-optimizations.

### 1.0
- Initial release.
