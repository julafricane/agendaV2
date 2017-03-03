var app = require('../app.js');
var moment = require('moment');
var _ = require('lodash');
app
.controller('HomeCtrl', ['$scope', '$http' ,'localStorageService', function ($scope, $http, localStorageService) {

  var ls = localStorageService;
  console.log("HomeCtrl loaded.");
  $scope.check = 'mon titre';
  moment.locale('fr');
  $scope.moment = moment;
  $scope.life = {
    orderfait : '-fait',
    orderdate : '-date',
    orderfin : '-datefin'
  }

  $scope.refresh = function(){
    window.location.reload()
  }

  $scope.save = function(){
    ls.set('liste', JSON.stringify($scope.liste));
    ls.set('ai', $scope.autoincrement);
  }
  $scope.clear = function(){
    ls.remove('liste');
    $scope.liste = [];
  }
  $scope.load = function(){
    $scope.liste = JSON.parse(ls.get('liste'));
    $scope.autoincrement = ls.get('ai');
    if($scope.autoincrement==undefined || $scope.autoincrement==null){
      $scope.autoincrement=0;
      ls.set('ai', 0);
    }

  }

  $scope.supprimer = function(item){
    console.log(item.id);
    $scope.liste = _.filter($scope.liste , function(i){return i.id !== item.id});
  }

  $scope.ajouter = function($event){
    console.log('ajout!');
    if($scope.date!=undefined && $scope.matiere!=undefined && $scope.datefin!=undefined){
      $scope.liste.push({
        /*id:qqchose*/
        id: $scope.autoincrement,
        date: $scope.date,
        matiere: $scope.matiere,
        datefin: $scope.datefin
      });
      $scope.autoincrement= $scope.autoincrement + 1;
      $scope.date=undefined;
      $scope.matiere=undefined;
      $scope.datefin=undefined;
    }
  }

  $scope.load();
  if($scope.liste == undefined || $scope.liste == null)
    $scope.liste = [];


  $scope.$watch(
    function(){
      // ce qu'on surveille
      return $scope.liste;
    },
    function(){
      // ce qu'on fait quand ça change
      console.log('liste modifiée !!');
      console.log($scope.liste);
      $scope.save();
    },
    true
  )


}]);
