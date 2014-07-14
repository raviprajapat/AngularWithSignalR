var myModule = angular.module('myModule', []);
myModule.factory('mySharedService', function ($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function (msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});

function ControllerZero($scope, sharedService) {
    $scope.handleClick = function (msg) {
        sharedService.prepForBroadcast(msg);
    };

    $scope.$on('handleBroadcast', function () {
        $scope.message = sharedService.message;
    });
}

function ControllerOne($scope, sharedService) {
    $scope.$on('handleBroadcast', function () {
        $scope.message = 'ONE: ' + sharedService.message;
    });
}

function ControllerTwo($scope, sharedService) {
    $scope.$on('handleBroadcast', function () {
        $scope.message = 'TWO: ' + sharedService.message;
    });
}

ControllerZero.$inject = ['$scope', 'mySharedService'];

ControllerOne.$inject = ['$scope', 'mySharedService'];

ControllerTwo.$inject = ['$scope', 'mySharedService'];