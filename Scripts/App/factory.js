/// <reference path="../angular.js" />
/// <reference path="Config.js" />

app.factory("RoomFactory", function () {
    var obj = {
        RoomId: 0,
        Rooms: [{ UnReadMsgCount: 0, RoomName: "Room1", RoomId: 1 },
                    { UnReadMsgCount: 0, RoomName: "Room2", RoomId: 2 },
                    { UnReadMsgCount: 0, RoomName: "Room3", RoomId: 3 },
                    { UnReadMsgCount: 0, RoomName: "Room4", RoomId: 4 },
                    { UnReadMsgCount: 0, RoomName: "Room5", RoomId: 5 },
                    { UnReadMsgCount: 0, RoomName: "Room6", RoomId: 6}]
    }

    
    return obj;
});

app.factory("signalR", function () {
    var $hub = $.connection.chat;
    var signalR = {
        startHub: function () {
            $.connection.hub.start();
        },
        EnterRoom: function (username, roomid) {
            $hub.server.enterRoom(username, roomid);
        },
        SendRoomMessage: function (userName, roomId, message) {
            $hub.server.sendRoomMessage(userName, roomId, message);
        },
        GetRoomMessage: function (callback) {
            $hub.client.getRoomMessage = callback;
        },
        RequestChatHistory: function (roomId, userName) {
            $hub.server.loadChatHistory(roomId, userName);
        },
        GetChatHistory: function (callback) {
            $hub.client.showChatHistory = callback;
        }
    }
    return signalR;
});