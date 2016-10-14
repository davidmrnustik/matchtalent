(function(global){
	var modal = {};

	function closeModal(id){
		var closeBut = document.querySelectorAll('.modal_open [data-modal-close]');
		
		for (var i = 0, l = closeBut.length; i < l; i++) {
			var item = closeBut[i],
					parent = item.parentElement.parentElement;

			if(id == parent.getAttribute('id')) {
				parent.addEventListener('click', function(e){
					if(e.target.className == 'modal modal_open' || e.target.classList.contains('js-modal-close') || e.target.className == 'modal__close'){
						utils.removeClass(parent, 'modal_open');
						utils.removeClass(document.documentElement, 'modal-page');
						document.body.style.paddingRight = "";
					}
				})
			}
		}
	}
	function openModal(id){
		var modals = document.querySelectorAll('.modal');

		for (var i = 0, l = modals.length; i < l; i++) {
			var item = modals[i];
			if(id == item.getAttribute('id')){
				utils.addClass(item, 'modal_open');
				utils.addClass(document.documentElement, 'modal-page');
				document.body.style.paddingRight = "15px"; // avoid small move when closes
				if(document.body.classList.contains('menu-open')){
					openMenu.toggle();
				}
				closeModal(id);
			}
		}
	}

	modal.init = function init(){
		//eventListener('a[data-modal]', toggleModal);

		var modalTriggers = document.querySelectorAll('a[data-modal]');

		for(var i = 0, l = modalTriggers.length; i < l; i++) {
			modalTriggers[i].addEventListener('click', function(e){
				e.preventDefault();
				openModal(this.getAttribute('href').substr(1));
			})
		}

	}

	global.modal = modal;
})(this);