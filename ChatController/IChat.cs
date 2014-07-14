using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularChatApp.ChatController
{
    public interface IChat
    {
        void EnterRoom(string userName, string roomId);
        void SendRoomMessage(string userName, string roomId, string message);
        void LeaveRoom(string userName, string roomId);
        void LoadChatHistory(string roomId, string userName);
    }
}