/*jshint curly:false, browser:true, jquery:true */
(function($) {
	'use strict';
	
	if (!$.fn.on) throw 'UltButtons requires jQuery 1.7 at least.';
	if (!$.ui || !$.ui.button) throw 'UltButtons requires the jQuery UI Button widget.';

	var fnCreate = $.ui.button.prototype._create,
		fnDestroy = $.ui.button.prototype._destroy,
		helperDiv = document.createElement('div'),
		//setting the unselectable property on all descendants is rather costly and fully supported only in Opera,
		//hence we do feature detection to don't apply it if it is not supported at all
		unselectableSupport = 'unselectable' in helperDiv,
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
		return this.on('selectstart.disableSelection', false); //selectstart for IE
	};

	$.fn.reenableSelection = function() {
		if (unselectableSupport) this.find('*').andSelf().prop('unselectable', '');
		if (userSelectSupport) this.css(userSelectSupport, '');
		return this.off('.disableSelection');
	}

	$.ui.button.prototype._create = function() {
		fnCreate.apply(this, arguments);
		if (this.type === 'checkbox' || this.type === 'radio') {
			var that = this;
			this.buttonElement.on('mousedown' + this.eventNamespace, function(e) {
				if (e.which !== 1) return;
				mdtarg = this;
				mdchecked = that.element[0].checked;
				$(document).one('mouseup', function() {
					mdtarg = null;
				});
			}).on('mouseup' + this.eventNamespace, function(e) {
				if (e.which !== 1 || that.options.disabled) return;
				var ch = that.element[0];
				if (mdtarg === this) {
					setTimeout(function() {
						if (mdchecked === ch.checked) {
							if (that.type === 'checkbox') {
								ch.checked = !ch.checked;
								that.refresh();
								that.element.change();
							} else if (!ch.checked) {
								ch.checked = true;
								that.refresh();
								that.element.change();
							}
						}
					}, 0);
				}
			}).disableSelection();
		}
	};

	$.ui.button.prototype._destroy = function() {
		if (this.type === 'checkbox' || this.type === 'radio') this.buttonElement.reenableSelection();
		fnDestroy.apply(this, arguments);
	}

	//for back-compat
	$.fn.ultButtonset = $.fn.buttonset;
	$.fn.ultButton = $.fn.button;
})(jQuery);
