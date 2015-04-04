# DEPRECATED

All shims, workarounds and p(r)olyfills have one ultimate goal, which is being deprecated. I'm happy to announce that we have finally achieved this goal. We encourage you to update to jQuery UI >= 1.10.4 and discard this plugin.

However, if you're stuck with an older version of jQuery UI, or really like the `disableSelection` feature, feel free to keep using this plugin. `:)`

# UltButtons

Improves jQuery UI Checkbox/Radio Buttons usability.

## Features

- ~~Fixes [#5518 Button: Incorrect state after double click in Firefox](http://bugs.jqueryui.com/ticket/5518)~~ - now fixed with my [PR #841](https://github.com/jquery/jquery-ui/pull/841),  milestone set to jQuery UI 1.10;
- ~~Works around [Firefox bug #608180 Double/rapid clicking a checkbox label does not work as expected](https://bugzilla.mozilla.org/show_bug.cgi?id=608180), providing the expected result~~ - now fixed as of Firefox 24 or so;
- ~~Fixes [#7665 Button: Radio button & checkboxes ignore mouseclicks for minor mouse movements](http://bugs.jqueryui.com/ticket/7665). Also, if you can spare some time, analyze and provide your support to my proposed definitive fix at [PR #854](https://github.com/jquery/jquery-ui/pull/854)!~~ now fixed by my [PR #1120](https://github.com/jquery/jquery-ui/pull/1120), landed on jQuery UI 1.10.4;
- Turns UI checkbox/radio buttons's text unselectable, very close to an actual button (dragging the mouse to outside of the button may start a selection in some browsers);
- Provides additional `$.fn.disableSelection()` and `$.fn.reenableSelection()` methods so you can undo the select-ability changes if you'd like or even apply these to any other elements in your page.

## Support

IE6+ and all modern desktop browsers - Firefox, Chrome, Opera, Safari.

## Demo

Check out the [Project Page](http://ultcombo.github.com/UltButtons/)!

## How to use

Include jQuery, jQuery UI and then ultbuttons.js, e.g.:

```html
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/trontastic/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
<script src="ultbuttons1.1.min.js"></script>
```

Then just make use of the now improved jQuery UI's `.button()`/`.buttonset()` widgets. `=]` Check out the jQuery UI button widget's [official documentation](http://jqueryui.com/button/#checkbox) if you're not sure how to use it.

## Notes

- UltButtons does not create any extra markup, instead, it works on top of the original jQuery UI `button`/`buttonset` methods.
- The plugin also does not use any globals.
- The plugin requires jQuery 1.7 at least, recommended is 1.8+.
- Always attach your `change` handlers with jQuery, the plugin will not fire handlers natively attached nor attached through other libraries (e.g. Prototype). However, if you desperately need an workaround, see the discussion at [Issue #2](https://github.com/UltCombo/UltButtons/issues/2).

## Changelog

### 1.1

- **Core**
    - UltButtons now extend the jQuery UI Button widget prototype's `_create` and `_destroy` methods, meaning you can now call `.button()`/`.buttonset()` on elements after including the ultbuttons script and all accessibility improvements will be applied automatically. This deprecates the `$.fn.ultButton` and `$.fn.ultButtonset` methods which now serve as aliases to their counterpart `$.fn.button` and `$.fn.buttonset` methods (for back-compat only);
    - Added the `$.fn.reenableSelection()` method which is used in the UI button prototype's `_destroy` method;
    - Removed the `$.UltC` namespace.<br><br>

- **disableSelection**
    - Fixed userSelect for Firefox and Chrome when using jQuery 1.7;
    - Fixed unselectable property for nested elements inside buttons in Opera.<br><br>

- **Unobstrusiveness**
    - No longer utilizes `.data()` to store checked state;
    - No longer attaches permanent handlers to `document`.

### 1.0.1

- Micro-optimizations.

### 1.0

- Initial release.

## License

MIT License.
