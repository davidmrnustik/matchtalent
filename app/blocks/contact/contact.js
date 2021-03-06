// Validating and sending a contact form.
/*
When you add a new item to validate, follow these steps:
- create a variable of an item
- register an error field to errorField array of every state - empty, length, ...
- add validations to validate function
- add an item like a new property to sendValues object in sendFormValues function
- reset value of a new item in resetForm function
*/

(function(global){
  var contact = {},
      errors = {},
      sendValues = {},
      textSuccess = document.querySelector('.contacto__success'),
      textError = document.querySelector('.contacto__error'),
      modalInitForm = document.querySelectorAll('[data-init-form]'),
      contactForm = document.getElementById('ContactForm'),
      contactFormIntro = document.getElementById('ContactFormIntro'),
      formName = document.getElementById('formName'),
      formCompany = document.getElementById('formCompany'),
      formEmail = document.getElementById('formEmail'),
      formPhoneNumber = document.getElementById('formPhoneNumber'),
      formTextarea = document.getElementById('formTextarea'),
      formCheckboxContitions = document.getElementById('formCheckboxConditions'),
      formCaptcha = document.getElementById('tmptxt'),
      errorField = [
        'ErrorNameEmpty',
        'ErrorNameShort',
        'ErrorEmailEmpty',
        'ErrorEmailFormat',
        'ErrorPhoneNumberEmpty',
        'ErrorPhoneNumberFormat',
        'ErrorCheckboxConditions',
        'ErrorTextShort',
        'ErrorTextEmpty',
        'ErrorCompanyEmpty',
        'ErrorCompanyShort',
        'ErrorCaptchaWrongCode'
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
    if (isNaN((parseInt(input.value).toString()))) {
      showErrorMessage(el, dataEl);
    } else {
      formPhoneNumber.value = parseInt(input.value).toString();
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
  function validateCaptcha(input, dataEl){
    var el = getDataElement(dataEl);

    $.ajax({
      type: 'POST',
      url: './check-captcha.php',
      data: {tmptxt: formCaptcha.value},
      cache: false,
      success: function(msg){
        if(msg == 0 || msg == "0"){
          hideErrorMessage(el, dataEl);
          if (errorsReturn()) {
            setTimeout(function(){
              sendMail();
            }, 200);
          }
        } else {
          showErrorMessage(el, dataEl);
        }
      }
    });
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
    formCompany.value = "";
    formCaptcha.value = "";
  }
  function sendFormValues() {
    sendValues = {
      name: formName.value,
      email: formEmail.value,
      company: formCompany.value,
      phoneNumber: formPhoneNumber.value,
      message: formTextarea.value,
      tmptxt: formCaptcha.value
    };
    return sendValues;
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
    validateEmpty(formCompany, errorField[9]);
    validateLength(formCompany, errorField[10], 2);
    validateCaptcha(formCaptcha, errorField[11]);
  }
  function sendMail(){
    $.ajax({
      type: 'POST',
      url: './sendmail.php',
      data: sendFormValues(),
      cache: false,
      success: function(msg){
        if(msg == 0 || msg == "0"){
          contactForm.setAttribute('hidden', 'hidden');
          contactFormIntro.setAttribute('hidden', 'hidden');
          textSuccess.removeAttribute('hidden');
          resetForm();
          sendValues = {};
          smoothScroll.animateScroll('#ContactFormIntro');
        } else {
          textError.removeAttribute('hidden', 'hidden');
        }
      }
    });
  }
  function initForm(){

    for(var i = 0, l = modalInitForm.length; i < l; i++){
      modalInitForm[i].addEventListener('click', function(){
        textSuccess.setAttribute('hidden', 'hidden');
        textError.setAttribute('hidden', 'hidden');
        contactForm.removeAttribute('hidden');
        contactFormIntro.removeAttribute('hidden');
      })
    }
  }

  contact.init = function init(){

    initForm();

    if(document.getElementById('formButton') != null) {
      document.getElementById('formButton').addEventListener('click', validate);
    }
  };

  global.contact = contact;

})(this);