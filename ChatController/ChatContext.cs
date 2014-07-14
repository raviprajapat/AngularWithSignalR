using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularChatApp.ChatController
{
    public static class ChatContext
    {
        public static List<User> AddUsers(this List<User> users, User user)
        {
            if (users.Where(s => s.UserName == user.UserName).Count() == 0)
            {
                users.Add(user);
                return users;
            }
            else
            {
                var _user = users.Where(s => s.UserName == user.UserName).FirstOrDefault();
                _user.ConnectionId.AddConnection(user.ConnectionId);
                return users;
            }
        }
        public static List<User> RemoveUsers(this List<User> users, User user)
        {
            if (users.Where(s => s.UserName == user.UserName).Count()> 0)
            {
                var _user = users.Where(s => s.UserName == user.UserName).FirstOrDefault();
                if (_user.ConnectionId.Count() > 2)
                    _user.ConnectionId.RemoveConnection(user.ConnectionId.FirstOrDefault());
                else
                    users.Remove(_user);
            }
            return users;
            
        }
        public static List<MapRoomUser> AddMapRoomUser(this List<MapRoomUser> mapRoomUsers, MapRoomUser mapRoomUser)
        {
            mapRoomUsers.Add(mapRoomUser);
            return mapRoomUsers;
        }
        public static List<MapRoomUser> RemoveMapRoomUser(this List<MapRoomUser> mapRoomUsers, MapRoomUser mapRoomUser)
        {
            mapRoomUsers.Remove(mapRoomUsers.Where(s => s.user == mapRoomUser.user).FirstOrDefault());
            return mapRoomUsers;
        }

        private static string[] AddConnection(this string[] usersConnectonId, string[] connectionId)
        {
            List<string> _connectionid = usersConnectonId.ToList();
            _connectionid.AddRange(connectionId);
            return _connectionid.Distinct().ToArray();
        }
        private static string[] RemoveConnection(this string[] usersConnectonId, string connectionId)
        {
            List<string> _connectionid = usersConnectonId.ToList();
            _connectionid.Remove(connectionId);
            return _connectionid.Distinct().ToArray();
        }
    }

    public class User
    {
        public string UserId { get { return Guid.NewGuid().ToString(); } }
        public string UserName { get; set; }
        public string[] ConnectionId { get; set; }
    }

    public class MapRoomUser
    {
        public User user { get; set; }
        public string roomId { get; set; }
    }

    public class Message
    {
        public string MessageId { get; set; }
        public string SendUser { get; set; }
        public string Text { get; set; }
        public string RoomId { get; set; }
    }
}