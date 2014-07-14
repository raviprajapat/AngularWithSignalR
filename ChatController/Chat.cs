using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
namespace AngularChatApp.ChatController
{
    public class Chat : Hub, IChat
    {
        private static List<User> userCollection = new List<User>();
        private static List<MapRoomUser> mapRoomUserCollection = new List<MapRoomUser>();
        private static List<Message> msgCollection = new List<Message>();

        public void EnterRoom(string userName, string roomId)
        {
            var users = userCollection.Where(s => s.UserName == userName);
            if (users.Count() == 0)
                userCollection.Add(new User() { UserName = userName, ConnectionId = new string[] { Context.ConnectionId } });
            else
                users.FirstOrDefault().ConnectionId = new string[] { Context.ConnectionId };
            if (mapRoomUserCollection.Where(s => s.user.UserName == userName && s.roomId == s.roomId).Count() == 0)
                mapRoomUserCollection.Add(new MapRoomUser() { user = new User() { UserName = userName }, roomId = roomId });
            Groups.Add(Context.ConnectionId, roomId);
            LoadChatHistory(roomId, userName);
        }

        public void SendRoomMessage(string userName, string roomId, string message)
        {
            var msg = new Message() { SendUser = userName, RoomId = roomId, MessageId = Guid.NewGuid().ToString(), Text = message };
            msgCollection.Add(msg);
            Clients.Group(roomId).getRoomMessage(msg);
        }

        public void LeaveRoom(string userName, string roomId)
        {
            mapRoomUserCollection.Remove(mapRoomUserCollection.Where(s => s.user.UserName == userName && s.roomId == roomId).FirstOrDefault());
        }

        public void LoadChatHistory(string roomId, string userName)
        {
            var messages = msgCollection.Where(s => s.RoomId == roomId);
            Clients.Client(Context.ConnectionId).showChatHistory(messages);
        }
    }
}