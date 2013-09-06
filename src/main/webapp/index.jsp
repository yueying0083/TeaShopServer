<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>TeaShop</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<!-- stylesheets -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/style.css"
	media="screen" />
<link id="color" rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath }/resources/css/colors/blue.css" />
<!-- scripts (jquery) -->
<script src="${pageContext.request.contextPath }/resources/scripts/jquery-1.4.2.min.js"
	type="text/javascript"></script>
<script src="${pageContext.request.contextPath }/resources/scripts/jquery-ui-1.8.custom.min.js"
	type="text/javascript"></script>
<script src="${pageContext.request.contextPath }/resources/scripts/smooth.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function() {
		style_path = "${pageContext.request.contextPath }/resources/css/colors";
		$("input:submit, input:reset").button();
	});
</script>
<script type="text/javascript">
	function IsValid() {
		var c = checkLength($("#a_userid"), 2, 25);
		c = c && checkLength($("#a_pwd"), 2, 15);
		return c;
	}
	function checkLength(o, min, max) {
		var val = o.val();
		if (val.length > max || val.length < min) {
			o.addClass("error");
			return false;
		} else {
			return true;
		}
	}
	var i = 0;
	function change() {
		document.getElementById("verifyImage").src = "${pageContext.request.contextPath }/admin/imageAction.action"
				+ "?id=" + (++i);

	}
</script>
</head>
<body>
	<div id="login">
		<!-- login -->
		<div class="title">
			<h5>Sign In to TeaShop</h5>
			<div class="corner tl"></div>
			<div class="corner tr"></div>
		</div>
		<s:if test="#request.err_msg == 1 || #request.err_msg == 2">
			<div class="messages">
				<div id="message-error" class="message message-error">
					<div class="image">
						<img src="${pageContext.request.contextPath }/resources/images/icons/error.png" alt="Error"
							height="32" />
					</div>
					<div class="text">
						<h6></h6>
						<span> <s:if test="#request.err_msg == 1">用户名/密码</s:if> <s:else>验证码</s:else>错误
						</span>
					</div>
					<div class="dismiss">
						<a href="#message-error"></a>
					</div>
				</div>
			</div>
		</s:if>
		<div class="inner">
			<form action="login.action" method="post"
				onsubmit="return IsValid();">
				<div class="form">
					<!-- fields -->
					<div class="fields">
						<div class="field">
							<div class="label">
								<label for="username">Username:</label>
							</div>
							<div class="input">
								<input type="text" id="a_userid" name="teashopManager.username" size="40" value="<s:property value="teashopManager.username" />"
									class="focus" />
							</div>
						</div>
						<div class="field">
							<div class="label">
								<label for="password">Password:</label>
							</div>
							<div class="input">
								<input type="password" id="a_pwd" name="teashopManager.password" size="40"
									class="focus" />
							</div>
						</div>
						<div class="field">
							<div class="label">
								<label for="password">Verify Code:</label>
							</div>
							<div class="input">
								<input type="text" id="verifyCode" name="verifyCode" size="20"
									class="verifyCode" /><img id="verifyImage"
									class="verifyCodeImg"
									src="${pageContext.request.contextPath }/imageAction.action"
									name="verifyCode" style="cursor: pointer;" onclick="change()" />
							</div>
						</div>
						<div class="buttons">
							<input type="submit" value="Sign In" />
						</div>
					</div>
					<!-- end fields -->
				</div>
			</form>
		</div>
		<!-- end login -->
		<div id="colors-switcher" class="color">
			<a href="" class="blue" title="Blue"></a> <a href="" class="green"
				title="Green"></a> <a href="" class="brown" title="Brown"></a> <a
				href="" class="purple" title="Purple"></a> <a href="" class="red"
				title="Red"></a> <a href="" class="greyblue" title="GreyBlue"></a>
		</div>
	</div>
</body>
</html>