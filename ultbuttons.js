(function($) {
	$.UltC || ($.UltC = {});

	$.UltC.unselectableSupport = document.createElement('div').hasOwnProperty('unselectable');

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
		if (e.which !== 1) return false;
		$.UltC.mdtarg = e.target;
	}).on('mousedown', 'label.ui-button', function(e) {
		if (e.which !== 1) return false;
		var $this = $(this);
		$this.data('checked', $this.prev()[0].checked);
	}).on('mouseup', 'label.ui-button', function(e) {
		if (e.which !== 1) return false;
		var $this = $(this),
			$ch = $this.prev(),
			ch = $ch[0];
		setTimeout(function() {
			if (ch.disabled) return false;
			var targ = $.UltC.mdtarg;
			if ($this.data('checked') === ch.checked && ($this.has(targ).length || targ === $this[0])) {
				if ($ch.is('[type="radio"]')) {
					if (!ch.checked) {
						ch.checked = true;
						$ch.trigger('change');
						$this.addClass('ui-state-active').attr('aria-pressed', true);
					}
				} else {
					var inversechecked = !ch.checked;
					ch.checked = inversechecked;
					$ch.trigger('change');
					if (inversechecked) $this.addClass('ui-state-active');
					else $this.removeClass('ui-state-active');
					$this.attr('aria-pressed', inversechecked);
				}
			}
		}, 0);
	});
})(jQuery);
