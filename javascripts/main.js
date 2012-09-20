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
		$this.data('checked', $('input[id="'+ $this.attr('for') + '"]')[0].checked);
	}).on('mouseup', 'label.ui-button', function(e) {
		if (e.which !== 1) return;
		var $this = $(this),
			$ch = $('input[id="'+ $this.attr('for') + '"]'),
			ch = $ch[0];
		setTimeout(function() {
			if (ch.disabled) return;
			var targ = $.UltC.mdtarg;
			if ($this.data('checked') === ch.checked && ($this.has(targ).length || targ === $this[0])) {
				if ($ch.is('[type="radio"]')) {
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
	});
})(jQuery);
