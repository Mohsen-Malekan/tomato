(function () {
  angular.module('app', ['vcRecaptcha'])
    .controller('ContactController', ['$http', 'vcRecaptchaService', ContactController])
    .controller('NewsController', ['$http', NewsController]);

  function ContactController ($http, vcRecaptchaService) {
    var vm    = this;
    vm.key    = '6LeUlvYSAAAAAA-49azrKdddxNMtUATbOVh3FPEN';
    vm.alerts = [];
    vm.submit = submit;

    vm.setResponse  = function (response) {
      vm.response = response;
    };
    vm.setWidgetId  = function (widgetId) {
      vm.widgetId = widgetId;
    };
    vm.cbExpiration = function () {
      vcRecaptchaService.reload(vm.widgetId);
      vm.response = null;
    };

    function submit (form) {
      if (form.$valid) {
        return $http.post('api/contacts', vm.contact)
          .then(function (res) {
            vm.contact = {};
          });
      }
    }
  }

  function NewsController ($http) {
    var vm        = this;
    vm.loaded     = false;

    $http.get('api/news/latest')
      .then(function (res) {
        vm.news = res.data;
        vm.loaded = true;
      });
  }
})();
