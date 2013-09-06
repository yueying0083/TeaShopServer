<%@ page language="java" import="java.util.*" pageEncoding="utf8"%>
<%@page import="cn.yueying.teashop.model.*"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Hello World</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
</head>

<body>
	登录：
	<br />
	<form action="login" method="post">
		用户名：<input name="teashopManager.username" id="username" /><br />
		密&nbsp;&nbsp;码：<input name="teashopManager.password" id="password"
			type="password" /> <br /> <input type="submit" />
	</form>
	<br /> 注册：
	<br />
	<form action="register" method="post">
		用户名：<input name="teashopManager.username" id="r_username" /><br />
		密&nbsp;&nbsp;码：<input name="teashopManager.password" id="r_password"
			type="password" /> <br /> <input type="submit" value="注册" />
	</form>
</body>
</html>
