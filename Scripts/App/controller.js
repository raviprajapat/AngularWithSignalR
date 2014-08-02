/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />
/// <reference path="Config.js" />

app.controller("Rooms", function ($scope, RoomFactory, signalR) {
    $scope.$parent.UserName = "";
    $scope.rooms = RoomFactory.Rooms;
    $scope.$parent.UserName = prompt("Enter unique name :");
    $scope.chatHistory = [];
    signalR.startHub();
    $scope.typemsgdisable = true;
    $scope.openChatPanel = function (RoomId, RoomName) {
        //$scope.templateURL = "/Template/ChatPanel.htm";
        RoomFactory.RoomId = RoomId;
        $scope.RoomId = RoomId;
        $scope.RoomName = RoomName;
        $scope.chatHistory = [];
        signalR.EnterRoom($scope.$parent.UserName, $scope.RoomId);
        $scope.typemsgdisable = false;
        //Check this for each function
        angular.forEach($scope.rooms, function (room, key) {
            if ($scope.RoomId == room.RoomId) {
                room.UnReadMsgCount = 0;
            }
        });
        $scope.$apply();
    };

    $scope.setcolor = function (unreadCount) {
        if (unreadCount > 0)
            return { 'background-color': 'red' };
    };
    $scope.sendMsgOnEnter = function ($event) {
        if ($event.keyCode == 13) {
            $scope.sendMessage();
            $event.preventDefault();
        }
    }
    $scope.sendMessage = function () {
        signalR.SendRoomMessage($scope.$parent.UserName, $scope.RoomId, $scope.typeMessage);
        $scope.typeMessage = "";
    };
    signalR.GetRoomMessage(function (message) {
        if (message.RoomId == $scope.RoomId) {
            $scope.chatHistory.push(message);
            $scope.$apply();
        }
        else {
            angular.forEach($scope.rooms, function (room, key) {
                if (message.RoomId == room.RoomId) {
                    //room.UnReadMsgCount = room.UnReadMsgCount + 1;
                    $scope.rooms[key].UnReadMsgCount = room.UnReadMsgCount + 1;
                }
            });
            $scope.$apply();
        }
    });
    signalR.GetChatHistory(function (messages) {
        $scope.chatHistory = messages;
        $scope.$apply();
    });
});

