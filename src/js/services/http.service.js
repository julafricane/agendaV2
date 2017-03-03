var app = require('../app.js');
var AngularLocalStorage = require('angular-local-storage');

app.factory(
  'httpService',
  ['$http', 'localStorageService',
  function ($http, localStorageService) {
    // ===============================================
    // === TODO : SET YOUR FEATHER APP ADRESS HERE ===
    // ===============================================
    var server = 'http://localhost:3030';
    // ==============================================

    var service = {
      register : register,
      login : login,
      get: get,
      patch: patch,
      post: post,
      delete: destroy
    };
    var ls = localStorageService;
    var user = ls.get('me');
    var token = user == undefined || user == null ? undefined : user.token;

    var header = {
      'Content-Type' : 'application/json'
    };
    if(user !== undefined && user !== null){
      header.Authorization = token;
    }

    return service;

    function register(data) {
      var config = {
        headers: header
      };
      return $http.post(server+'/users', data, config);
    }

    function login(data) {
      var config = {
        headers: header
      };
      return $http.post(server+'/auth/local', data, config);
    }

    function get(url, params) {
      var config = {
        params: params,
        headers: header
      };
      return $http.get(server+'/'+url, config);
    }

    function patch(url, data) {
      var config = {
        headers: header
      };
      return $http.patch(server+'/'+url, data, config);
    }

    function post(url, data) {
      var config = {
        headers: header
      };
      return $http.post(server+'/'+url, data, config);
    }

    function destroy(url) {
      var config = {
        headers: header
      };
      return $http.delete(server+'/'+url);
    }
  }
]);
