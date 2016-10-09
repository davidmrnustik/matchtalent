(function(global){
	var ourPlans = {},
			periodText = document.querySelectorAll('span[data-plan-period]'),
			prices = document.querySelectorAll('span[data-plan-price]'),
			periods = document.querySelectorAll('input[type=radio]');

	function toggleAttribute(el){
		for(var i = 0, l = periodText.length; i < l; i++){
			if(periodText[i].getAttribute('data-plan-period') == el){
				var elem = periodText[i];
				if(elem.hasAttribute('hidden')){
					elem.removeAttribute('hidden');
					if(elem.nextSibling){
						elem.nextSibling.setAttribute('hidden', 'hidden');
					} else {
						elem.previousSibling.setAttribute('hidden', 'hidden');
					}
				}
			}
		}
	}
	function updatePrice(data, value){
		for(var i = 0, l = prices.length; i < l; i++){
			if(prices[i].getAttribute('id') == data){
				prices[i].innerHTML = value;
			}
		}
	}
	function eventListener(){
		for(var i = 0, l = periods.length; i < l; i++){
			periods[i].addEventListener('change', function(){
				updatePrice(this.getAttribute('data-period-for'), this.value);
				toggleAttribute(this.getAttribute('id'));
			})
		}
	}
	function setPrice(){
		for(var i = 0, l = prices.length; i < l; i++){
			for(var j = 0, k = periods.length; j < k; j++){
				if((prices[i].getAttribute('id') == periods[j].getAttribute('data-period-for')) && periods[j].checked){
					prices[i].innerHTML = periods[j].value;
				}
			}
		}
	}
	ourPlans.init = function init() {
		setPrice();
		eventListener();
	}

	global.ourPlans = ourPlans;
})(this);