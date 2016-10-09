(function(global){
	var contactForm = {},
			errors = {},
			contactForm = document.getElementById('ContactForm'),
			formName = document.getElementById('formName'),
			formEmail = document.getElementById('formEmail'),
			formPhoneNumber = document.getElementById('formPhoneNumber'),
			formTextarea = document.getElementById('formTextarea'),
			formCheckboxContitions = document.getElementById('formCheckboxConditions'),
			errorField = [
				'ErrorNameEmpty',
				'ErrorNameShort',
				'ErrorEmailEmpty',
				'ErrorEmailFormat',
				'ErrorPhoneNumberEmpty',
				'ErrorPhoneNumberFormat',
				'ErrorCheckboxConditions',
				'ErrorTextShort',
				'ErrorTextEmpty'
			];

	function getDataElement(idAttr) {
		var errorEl = document.querySelectorAll('.error');
		if (errorEl.length > 0) {
			for (var i = 0, l = errorEl.length; i < l; i++) {
				var el = errorEl[i];
				if (el.getAttribute('data-error-type') == idAttr) {
					return el;
				}
			}
		} else {
			console.log("There is no element with class .error.");
		}
	}

	function showErrorMessage(el, dataEl) {
		errors[dataEl] = true;
		el.innerHTML = el.getAttribute('data-error-msg');
		el.removeAttribute('hidden');
	}

	function hideErrorMessage(el, dataEl) {
		errors[dataEl] = false;
		el.setAttribute('hidden', 'hidden');
	}

	function validateEmpty(input, dataEl) {
		var el = getDataElement(dataEl);
		if (input.value == "") {
			showErrorMessage(el, dataEl);
		} else {
			hideErrorMessage(el, dataEl);
		}
	}
	function validateLength(input, dataEl, limit) {
		var el = getDataElement(dataEl),
				len = 0;
		if(input.nodeName == "TEXTAREA"){
			len = input.textLength
		} else {
			len = input.value.length;
		}
		if (len <= limit) {
			showErrorMessage(el, dataEl);
		} else {
			hideErrorMessage(el, dataEl);
		}
	}
	function validateNumber(input, dataEl) {
		var el = getDataElement(dataEl);
		if (isNaN(parseInt(input.value)) && input.value != "") {
			showErrorMessage(el, dataEl);
		} else {
			if (input.value != ""){
				formPhoneNumber.value = parseInt(input.value);
			}
			hideErrorMessage(el, dataEl);
		}
	}
	function validateEmail(input, dataEl) {
		var el = getDataElement(dataEl);
		if (!/^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/.test(input.value)) {
			showErrorMessage(el, dataEl);
		} else {
			hideErrorMessage(el, dataEl);
		}
	}
	function validateCheckbox(input, dataEl) {
		var el = getDataElement(dataEl);
		if (!input.checked) {
			showErrorMessage(el, dataEl);
		} else {
			hideErrorMessage(el, dataEl);
		}
	}
	function errorsReturn() {
		var count = 0;
		for (var i = 0, l = errorField.length; i < l; i++) {
			if (errors[errorField[i]] == false) {
				count += 1;
			}
		}
		return (count == errorField.length) ? true : false;
	}
	function resetForm() {
		formName.value = "";
		formEmail.value = "";
		formPhoneNumber.value = "";
		formTextarea.value = "";
		formCheckboxContitions.checked = false;
	}
	function sendFormValues() {
		var values = {
			name: formName.value,
			email: formEmail.value,
			phoneNumber: formPhoneNumber.value,
			text: formTextarea.value
		};
		return values;
	}
	function validate(e) {
		e.preventDefault();
		validateEmpty(formName, errorField[0]);
		validateLength(formName, errorField[1], 2);
		validateEmpty(formEmail, errorField[2]);
		validateEmail(formEmail, errorField[3]);
		validateEmpty(formPhoneNumber, errorField[4]);
		validateNumber(formPhoneNumber, errorField[5]);
		validateCheckbox(formCheckboxContitions, errorField[6]);
		validateLength(formTextarea, errorField[7], 10);
		validateEmpty(formTextarea, errorField[8]);

		if (errorsReturn()) {
			contactForm.submit;
			console.log("Contact form data are:" + sendFormValues());
			resetForm();
		}
	}

	contactForm.init = function init(){
		document.getElementById('formButton').addEventListener('click', validate);
	};

	global.contactForm = contactForm;

})(this);