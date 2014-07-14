/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />

var app = angular.module("ChatApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'Rooms',
        templateUrl: 'Template/Rooms.htm'
    })
    .otherwise({
        redirectTo: '/'
    });
});

