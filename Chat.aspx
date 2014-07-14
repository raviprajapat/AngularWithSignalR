<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Chat.aspx.cs" Inherits="AngularChatApp.Chat" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Angular Chat App</title>
    <script src="Scripts/jquery-2.0.3.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-1.0.1.js" type="text/javascript"></script>
    <script src="signalr/hubs" type="text/javascript"></script>
    <script src="Scripts/angular.js" type="text/javascript"></script>
    <script src="Scripts/angular-route.js" type="text/javascript"></script>
    <script src="Scripts/App/Config.js" type="text/javascript"></script>
    <script src="Scripts/App/factory.js" type="text/javascript"></script>
    <script src="Scripts/App/controller.js" type="text/javascript"></script>
    
    <!--Style-->
    <link href="Content/bootstrap-theme.css" rel="stylesheet" type="text/css" />
    <link href="Content/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="Content/custom.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div ng-app="ChatApp">
        <div ng-view>
        </div>
    </div>
    </form>
</body>
</html>
