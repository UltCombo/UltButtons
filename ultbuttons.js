/*jshint curly:false, browser:true, jquery:true */
(function($) {
	'use strict';
	
	if (!$.fn.on) throw 'UltButtons requires jQuery 1.7 at least.';

	var helperDiv = document.createElement('div'),
		//setting the unselectable property on all descendants is rather costly and supported only in Opera and IE,
		//hence we do feature detection to don't apply it if it is not supported at all
		unselectableSupport = helperDiv.hasOwnProperty && helperDiv.hasOwnProperty('unselectable'),
		//jQuery 1.8+ does the prefix normalization for userSelect automatically, but as we support jQuery 1.7 which
		//doesn't do the prefixing, we use feature detection.
		//Unlike jQuery 1.8's internal vendorPropName function, our function returns false instead of the original name,
		//this way we don't apply the .css() method in case userSelect isn't supported
		userSelectSupport = (function() {
			var prop = 'userSelect',
				st = helperDiv.style;
			if (prop in st) return prop;

			var capProp = 'UserSelect',
				prefixes = ['Moz', 'Webkit', 'O', 'ms'];
			
			for (var i = 0; i < prefixes.length; i++) {
				prop = prefixes[i] + capProp;
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

	$.fn.ultButtonset = function() {
		this.buttonset.apply(this, arguments);
		this.find('label.ui-button').disableSelection();
		return this;
	};
	$.fn.ultButton = function() {
		this.button.apply(this, arguments);
		return this.each(function() {
			$('label[for="' + this.id + '"]').disableSelection();
		});
	};

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

		//usually, the click target is the span inside the label.ui-button: `$this.has(targ).length`. It also takes care of user-created elements inside the label e.g. images
		//but if the user manages to click in the default 1px border of the label, the target will be the label element itself: `targ === $this[0]`
		if ($this.has(mdtarg).length || mdtarg === $this[0]) {
			setTimeout(function() {
				//if the ui button firing the mouseup handler is the same that triggered the last mousedown handler and the checked state didn't change after
				//the jQuery UI handled the events (hence the setTimeout), we do the magic
				if (mdchecked === ch.checked) {
					if (ch.type === 'checkbox') {
						var inversechecked = !ch.checked;
						ch.checked = inversechecked;
						$this.toggleClass('ui-state-active', inversechecked).attr('aria-pressed', inversechecked);
						$ch.change();
					} else if (ch.type === 'radio' && !ch.checked) {
						$('input[type="radio"][name="' + ch.name + '"]:checked').button('widget').removeClass('ui-state-active').attr('aria-pressed', false);
						ch.checked = true;
						$this.addClass('ui-state-active').attr('aria-pressed', true);
						$ch.change();
					}
				}
			}, 0);
		}
	});
})(jQuery);
