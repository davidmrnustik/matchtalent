(function() {
	openMenu.init();
	cookies.init();
	slider.init();
	footerLinks.init();
	header.init();
	sliderImage.init();
	ourPlans.init();
	contact.init();
	modal.init();
	smoothScroll.init({
	  selector: '[data-scroll]',
	  selectorHeader: '[data-scroll-header]',
	  speed: 1000,
	  easing: 'easeInOutQuad',
	  offset: 100,
	  updateURL: true,
	  callback: function ( anchor, toggle ) {}
	});
	intro.init();

	var app = angular
	.module('MatchTalentApp', ['ngRoute', 'pascalprecht.translate', 'ngCookies', 'ui.router'])
	.constant('LOCALES', {
		'locales': {
			'es': 'Español',
			'en': 'English'
		},
		'preferredLocale': 'en'
	});
	app.config(function($routeProvider, $translateProvider, LOCALES, $stateProvider, $locationProvider){
		$translateProvider
			.useStaticFilesLoader({
				prefix: '/translations/',
				suffix: '.json'
			})
			.preferredLanguage(LOCALES.preferredLocale)
			.useLocalStorage()
			.useCookieStorage()
			//.useSanitizeValueStrategy('escape')
			.useMissingTranslationHandlerLog()
		$stateProvider
			.state('app', {
				abstract: true,
				url: '/{lang:(?:es|en)}',
				template: '<ui-view/>'
			})
			.state('app.home', {
				url: '',
				templateUrl: '/views/main.html'
			})
			.state('app.ventajas', {
				url: '/ventajas',
				templateUrl: './ventajas.html'
			})
			.state('app.precios', {
				url: '/precios',
				templateUrl: './precios.html'
			})
			.state('app.portales', {
				url: '/portales',
				templateUrl: './portales.html'
			})
			.state('app.contacto', {
				url: '/contacto',
				templateUrl: './contacto.html'
			})
			.state('app.cookies', {
				url: '/cookies',
				templateUrl: './cookies.html'
			})
			.state('app.aviso-legal', {
				url: '/aviso-legal',
				templateUrl: './aviso-legal.html'
			})
			.state('app.condiciones', {
				url: '/condiciones',
				templateUrl: './condiciones.html'
			})
		$locationProvider.html5Mode(true);
	});

	app.service('LocaleService', function($translate, LOCALES, $rootScope) {
		'use strict';

		var localesObj = LOCALES.locales;

		var _LOCALES = Object.keys(localesObj);
		if (!_LOCALES || _LOCALES.length === 0) {
			console.error('There are no _LOCALES provided');
		}
		var _LOCALES_DISPLAY_NAMES = [];
		_LOCALES.forEach(function (locale) {
			_LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
		});

		var currentLocale = $translate.proposedLanguage();

		var checkLocaleIsValid = function (locale) {
			return _LOCALES.indexOf(locale) !== -1;
		};

		var setLocale = function (locale) {
			if (!checkLocaleIsValid(locale)) {
				console.error('Locale name "' + locale + '" is invalid"');
				return;
			}
			currentLocale = locale;
			$translate.use(locale);
		};

		$rootScope.$on('$translateChangeSuccess', function (event, data) {
			document.documentElement.setAttribute('lang', data.language);
		});

		return {
			getLocaleDisplayName: function() {
				return localesObj[currentLocale]
			},
			setLocaleByDisplayName: function(localeDisplayName) {
				setLocale(
					_LOCALES[
						_LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)
					]
				);
			},
			getLocalesDisplayNames: function() {
				return _LOCALES_DISPLAY_NAMES;
			}
		};
	});

	app.directive('ngLanguageSelect', function (LocaleService) {
		'use strict';

		return {
			restrict: 'A',
			replace: true,
			template: ''+
				'<div class="language-select" ng-if="visible">'+
					'<label>'+
						'<select ng-model="currentLocaleDisplayName"'+
							'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
							'ng-change="changeLanguage(currentLocaleDisplayName)">'+
						'</select>'+
					'</label>'+
				'</div>'+
			'',
			controller: function($scope) {
				$scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
				$scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
				$scope.visible = $scope.localesDisplayNames &&
				$scope.localesDisplayNames.length > 1;

				$scope.changeLanguage = function(locale) {
					LocaleService.setLocaleByDisplayName(locale);
				};
			}
		};
	});

	app.controller('AppController', function($scope, $rootScope, $translate, $stateParams, $location, $state, LOCALES) {
		
		var urlInicioId = 'URL_INICIO';
		var urlVentajasId = 'URL_VENTAJAS';
		var urlPreciosId = 'URL_PRECIOS';
		var urlPortalesId = 'URL_PORTALES';
		var urlContactoId = 'URL_CONTACTO';
		var urlCookiesId = 'URL_COOKIES';
		var urlAvisoLegalId = 'URL_AVISOLEGAL';
		var urlCondicionesId = 'URL_CONDICIONES';
		var imagesPrefix = "./img/";

		$translate(urlInicioId, urlVentajasId, urlPreciosId, urlPortalesId, urlContactoId, urlCookiesId, urlAvisoLegalId, urlCondicionesId)
			.then(function(translatedUrlInicioId, translatedUrlVentajasId, translatedUrlPreciosId, translatedUrlPortalesId, translatedUrlContactoId, translatedUrlCookiesId, translatedUrlAvisoLegalId, translatedUrlCondicionesId) {
				$rootScope.urlInicioId = translatedUrlInicioId;
				$rootScope.urlVentajasId = translatedUrlVentajasId;
				$rootScope.urlPreciosId = translatedUrlPreciosId;
				$rootScope.urlPortalesId = translatedUrlPortalesId;
				$rootScope.urlContactoId = translatedUrlContactoId;
				$rootScope.urlCookiesId = translatedUrlCookiesId;
				$rootScope.urlAvisoLegalId = translatedUrlAvisoLegalId;
				$rootScope.urlCondicionesId = translatedUrlCondicionesId;
			});

		if(/(|\/)/.test($location.path())) {
			$state.go('app.home', {lang: $translate.proposedLanguage()});
		}

		$rootScope.$on('$stateChangeStart', function(event, toState){
			$scope.currentPath = toState.name;
		});

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
			if($stateParams.lang !== undefined){
	      var otherLang = $stateParams.lang === 'es' ? 'en' : 'es';
	      $rootScope.activeLang = $stateParams.lang;
	      $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' + otherLang);
	      $translate.use($stateParams.lang);
	    }
		});
		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			$rootScope.activeLang = data.language;
			$rootScope.urlInicioId = $translate.instant(urlInicioId);
			$rootScope.urlVentajasId = $translate.instant(urlVentajasId);
			$rootScope.urlPreciosId = $translate.instant(urlPreciosId);
			$rootScope.urlPortalesId = $translate.instant(urlPortalesId);
			$rootScope.urlContactoId = $translate.instant(urlContactoId);
			$rootScope.urlCookiesId = $translate.instant(urlCookiesId);
			$rootScope.urlAvisoLegalId = $translate.instant(urlAvisoLegalId);
			$rootScope.urlCondicionesId = $translate.instant(urlCondicionesId);

			$scope.imagesPath = function(title, ext) {
				return imagesPrefix + title + "_" + $rootScope.activeLang + "." + ext;
			};
		});
	});
})();