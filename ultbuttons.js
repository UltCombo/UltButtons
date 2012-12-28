/*jshint curly:false, browser:true, jquery:true */
(function($) {
	'use strict';
	
	if (!$.fn.on) throw 'UltButtons requires jQuery 1.7 at least.';
	if (!$.ui || !$.ui.button) throw 'UltButtons requires the jQuery UI Button widget.';

	var fnCreate = $.ui.button.prototype._create,
		helperDiv = document.createElement('div'),
		//setting the unselectable property on all descendants is rather costly and fully supported only in Opera,
		//hence we do feature detection to don't apply it if it is not supported at all
		unselectableSupport = 'unselectable' in helperDiv.style,
		//jQuery 1.8+ does the prefix normalization for userSelect automatically, but as we support jQuery 1.7 which
		//doesn't do the prefixing, we use feature detection.
		//Unlike jQuery 1.8's internal vendorPropName function, our function returns false instead of the original name,
		//this way we don't apply the .css() method in case userSelect isn't supported
		userSelectSupport = (function() {
			var prop = 'userSelect',
				st = helperDiv.style;

			if (prop in st) return prop;

			var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
			for (var i = 0; i < prefixes.length; i++) {
				prop = prefixes[i] + 'UserSelect';
				if (prop in st) {
					return prop;
				}
			}
			return false;
		}()),
		mdtarg, mdchecked;
	helperDiv = null;

	$.fn.disableSelection = function() {
		if (unselectableSupport) this.find('*').andSelf().prop('unselectable', 'on'); //unselectable for Opera
		if (userSelectSupport) this.css(userSelectSupport, 'none'); //user-select for FF, Chrome
		return this.on('selectstart', false); //selectstart for IE
	};

	$.ui.button.prototype._create = function() {
		fnCreate.apply(this, arguments);
		if (this.type === 'checkbox' || this.type === 'radio') {
			this.widget().disableSelection();
		}
	};

	//for back-compat
	$.fn.ultButtonset = $.fn.buttonset;
	$.fn.ultButton = $.fn.button;

	$(document).mousedown(function(e) {
		if (e.which !== 1) return;
		mdtarg = e.target;
	}).on('mousedown', 'label.ui-button', function(e) {
		if (e.which !== 1) return;
		//the following selector is used to support eccentric ids, e.g. `input[id="foo.bar"]`.
		//we store the checked state of the input in the label during the mousedown event to check agaisnt on mouseup
		mdchecked = $('input[id="'+ $(this).attr('for') + '"]')[0].checked;
	}).on('mouseup', 'label.ui-button', function(e) {
		if (e.which !== 1) return;
		var $this = $(this),
			$ch = $('input[id="' + $this.attr('for') + '"]'),
			ch = $ch[0];

		if (ch.disabled) return;

		//usually, the click target is the span inside the label.ui-button: `$this.has(mdtarg).length`. It also takes care of user-created elements inside the label e.g. images
		//but if the user manages to click in the default 1px border of the label, the target will be the label element itself: `mdtarg === this`
		if ($this.has(mdtarg).length || mdtarg === this) {
			setTimeout(function() {
				//if the ui button firing the mouseup handler is the same that triggered the last mousedown handler and the checked state didn't change after
				//the jQuery UI handled the events (hence the setTimeout), we do the magic
				if (mdchecked === ch.checked) {
					if (ch.type === 'checkbox') {
						ch.checked = !ch.checked;
						$ch.button('refresh').change();
					} else if (ch.type === 'radio' && !ch.checked) {
						ch.checked = true;
						$ch.button('refresh').change();
					}
				}
			}, 0);
		}
	});
})(jQuery);
