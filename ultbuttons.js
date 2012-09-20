(function($) {
	$.UltC || ($.UltC = {});

	var helperDiv = document.createElement('div');
	$.UltC.unselectableSupport = helperDiv.hasOwnProperty && helperDiv.hasOwnProperty('unselectable');

	$.fn.disableSelection = function() {
		if ($.UltC.unselectableSupport) this.contents().andSelf().prop('unselectable', 'on'); //Opera
		return this
			.css('user-select', 'none') //FF, Chrome
			.on('selectstart', false); //IE
	};

	$.fn.ultButtonset = function() {
		this.buttonset.apply(this, arguments);
		this.find('label').disableSelection();
		return this;
	}
	$.fn.ultButton = function() {
		this.button.apply(this, arguments);
		return this.each(function() {
			$('label[for="' + this.id + '"]').disableSelection();
		});
	}

	$(document).mousedown(function(e) {
		if (e.which !== 1) return;
		$.UltC.mdtarg = e.target;
	}).on('mousedown', 'label.ui-button', function(e) {
		if (e.which !== 1) return;
		var $this = $(this);
		//using this selector to support eccentric ids, e.g. input[id="foo.bar"]
		//stores the checked state of the input during the mousedown event to check agaisnt on mouseup
		$this.data('checked', $('input[id="'+ $this.attr('for') + '"]').prop('checked'));
	}).on('mouseup', 'label.ui-button', function(e) {
		if (e.which !== 1) return;
		var $this = $(this),
			$ch = $('input[id="'+ $this.attr('for') + '"]'),
			ch = $ch[0],
			targ = $.UltC.mdtarg;

		if (ch.disabled) return;

		//usually, the click target is the span inside the label.ui-button: `$this.has(targ).length`. It also takes care of user-created elements inside the label e.g. images
		//but if the user manages to click in the default 1px border of the label, the target will be the label element itself: `targ === $this[0]`
		if ($this.has(targ).length || targ === $this[0]) {
			setTimeout(function() {
				//if the ui button firing the mouseup handler is the same that triggered the last mousedown handler and the checked state didn't change after
				//the jQuery UI handled the events (hence the setTimeout), we do the magic
				if ($this.data('checked') === ch.checked) {
					if (ch.type === 'radio') {
						if (!ch.checked) {
							ch.checked = true;
							$('input[type="radio"][name="' + ch.name + '"]').not(ch).each(function() {
								$('label[for="' + this.id + '"]').removeClass('ui-state-active').attr('aria-pressed', false);
							});
							$this.addClass('ui-state-active').attr('aria-pressed', true);
							$ch.trigger('change');
						}
					} else {
						var inversechecked = !ch.checked;
						ch.checked = inversechecked;
						if (inversechecked) $this.addClass('ui-state-active');
						else $this.removeClass('ui-state-active');
						$this.attr('aria-pressed', inversechecked);
						$ch.trigger('change');
					}
				}
			}, 0);
		}
	});
})(jQuery);
