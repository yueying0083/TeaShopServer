<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>UBeauty_Stat</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="../resources/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="../resources/css/style.css" media="screen" />
		<link rel="stylesheet" type="text/css" href="../resources/css/style_fixed_full.css" />
		<link id="color" rel="stylesheet" type="text/css" href="../resources/css/colors/blue.css" />
		<!-- scripts (jquery) -->
		<script src="../resources/scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
		<!--[if IE]><script language="javascript" type="text/javascript" src="../resources/scripts/excanvas.min.js"></script><![endif]-->
		<script src="../resources/scripts/jquery-ui-1.8.custom.min.js" type="text/javascript"></script>
		<script src="../resources/scripts/jquery.ui.selectmenu.js" type="text/javascript"></script>
		<script src="../resources/scripts/jquery.flot.min.js" type="text/javascript"></script>
		<script src="../resources/scripts/tiny_mce/jquery.tinymce.js" type="text/javascript"></script>
		<!-- scripts (custom) -->
		<script src="../resources/scripts/smooth.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.menu.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.chart.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.table.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.form.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.dialog.js" type="text/javascript"></script>
		<script src="../resources/scripts/smooth.autocomplete.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready(function () {
				style_path = "../resources/css/colors";
				$("#box-tabs, #box-left-tabs").tabs();
			});
		</script>
	</head>
	<body>
		<div id="colors-switcher" class="color">
			<a href="" class="blue" title="Blue"></a>
			<a href="" class="green" title="Green"></a>
			<a href="" class="brown" title="Brown"></a>
			<a href="" class="purple" title="Purple"></a>
			<a href="" class="red" title="Red"></a>
			<a href="" class="greyblue" title="GreyBlue"></a>
		</div>
		<!-- dialogs -->
		<div id="login" title="Login">
			<div class="inner">
				<form action="#" method="post" onsubmit="return IsValid();">
					<div class="form">
						<div class="fields">
							<div class="field field-first">
								<div class="label">
									<label for="input">Username:</label>
								</div>
								<div class="input">
									<input type="text" id="a_userid" name="user.name" />
								</div>
							</div>
							<div class="field">
								<div class="label">
									<label for="input">Password:</label>
								</div>
								<div class="input">
									<input type="password" id="a_pwd" name="user.password" />
								</div>
							</div>
							<div class="field">
								<div class="label">
									<label for="password">Verify Code:</label>
								</div>
								<div class="input">
									<input type="text" id="verifyCode" name="verifyCode" size="20"
										class="verifyCode" /><img id="verifyImage"
										class="verifyCodeImg" src="../admin/imageAction.action"
										name="verifyCode" style="cursor: pointer;" onclick="change()" />
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- end dialogs -->
		<!-- header -->
		<div id="header">
			<div id="header-outer">
				<!-- logo -->
				<div id="logo">
					<h1>
						<a href="" title="TeaShop"><img
							src="../resources/images/logo.png" alt="TeaShop" /></a>
					</h1>
				</div>
				<!-- end logo -->
				<!-- user -->
				<ul id="user">
					<s:if test="#session.loginName != null">
						<li class="first"><a href=""><s:property
									value="#session.loginName" /></a></li>
						<li><a href="../admin/exit.action">Logout</a></li>
					</s:if>
					<s:else>
						<li class="first"><a href="javascript: login()">Login</a></li>
					</s:else>
					<li class="last highlight"><a href="../">View Site</a></li>
				</ul>
				<!-- end user -->
				<div id="header-inner">
					<div id="home">
						<a href=""></a>
					</div>
					<!-- quick -->
					<ul id="quick">
						<li>
							<a href="javascript: return -1" title="新品上市">
								<span class="icon">
									<img src="../resources/images/icons/application_double.png" alt="新品上市" />
								</span>
								<span>新品上市</span>
							</a>
						</li>
						<li>
							<a href="javascript: return -1" title="最新优惠">
								<span class="icon">
									<img src="../resources/images/icons/page_white_copy.png" alt="最新优惠" />
								</span>
								<span>最新优惠</span>
							</a>
						</li>
						<li>
							<a href="javascript: return -1" title="评论管理">
								<span class="icon">
									<img src="../resources/images/icons/calendar.png" alt="评论管理" />
								</span>
								<span>评论管理</span>
							</a>
						</li>
						<li>
							<a href="javascript: return -1" title="会员管理">
								<span class="icon">
									<img src="../resources/images/icons/page_white_copy.png" alt="会员管理" />
								</span>
								<span>会员管理</span>
							</a>
						</li>
					</ul>
					<!-- end quick -->
					<div class="corner tl"></div>
					<div class="corner tr"></div>
				</div>
			</div>
		</div>
		<!-- end header -->
		<!-- content -->
		<div id="content">
			<!-- table -->
			<div class="box">
				<!-- box / title -->
				<div class="title">
					<h5>Products</h5>
					<div class="search">
						<form action="#" method="post">
							<div class="input">
								<input type="text" id="search" name="search" />
							</div>
							<div class="button">
								<input type="submit" name="submit" value="Search" />
							</div>
						</form>
					</div>
				</div>
				<!-- end box / title -->
				<div class="table">
					<form action="" method="post">
					<table>
						<thead>
							<tr>
								<th class="left">Title</th>
								<th>Price</th>
								<th>Created</th>
								<th class="selected last"><input type="checkbox" class="checkall" /></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="title">春季养颜奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">椰果奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">红豆沙玄米奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">巧克力奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">木瓜杏仁奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">红糖奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="title">仙草冻奶茶</td>
								<td class="price">￥13.00</td>
								<td class="date">April 25th, 2010 at 4:15 PM</td>
								<td class="selected last"><input type="checkbox" /></td>
							</tr>
						</tbody>
					</table>
					<!-- pagination -->
					<div class="pagination pagination-left">
						<div class="results">
							<span>showing results 1-10 of 207</span>
						</div>
						<ul class="pager">
							<li class="disabled">&laquo; prev</li>
							<li class="current">1</li>
							<li>2</li>
							<li><a href="">3</a></li>
							<li><a href="">4</a></li>
							<li><a href="">5</a></li>
							<li class="separator">...</li>
							<li><a href="">20</a></li>
							<li><a href="">21</a></li>
							<li><a href="">next &raquo;</a></li>
						</ul>
					</div>
					<!-- end pagination -->
					<!-- table action -->
					<div class="action">
						<select name="action">
							<option value="" class="locked">Set status to Deleted</option>
							<option value="" class="unlocked">Set status to Published</option>
							<option value="" class="folder-open">Move to Category</option>
						</select>
						<div class="button">
							<input type="submit" name="submit" value="Apply to Selected" />
						</div>
					</div>
					<!-- end table action -->
					</form>
				</div>
			</div>
			<!-- forms -->
			<div class="box">
				<div class="title">
					<h5>自定义图表</h5>
				</div>
				<div class="form">
					<div class="fields">
						<div class="field">
							<div class="label">
								<label for="input-error">Type Ids:</label>
							</div>
							<div class="input">
								<input type="text" id="input_types" name="input.error"
									class="large error" onclick="code_select_list()" /> <span
									class="error">填入ID，最多支持8个，请以逗号隔开。</span>
							</div>
						</div>
						<div class="field">
							<div class="label">
								<label for="select">Xaxis:</label>
							</div>
							<div class="select">
								<select id="input_xaxis" name="select">
									<option value=0>Hour</option>
									<option value=1>Day</option>
									<option value=2>Month</option>
									<option value=3>Year</option>
								</select>
							</div>
						</div>
						<div class="field">
							<div class="label">
								<label for="date">Start Time:</label>
							</div>
							<div class="input">
								<input type="text" id="input_date1" name="input.date"
									class="date" />
							</div>
						</div>
						<div class="field">
							<div class="label">
								<label for="date">End Time:</label>
							</div>
							<div class="input">
								<input type="text" id="input_date2" name="input.date"
									class="date" />
							</div>
						</div>
						<div class="buttons">
							<input type="submit" name="submit" value="Submit"
								onclick="javascript: go()" />
						</div>
					</div>
				</div>
			</div>
			<!-- end forms -->
		</div>
		<!-- end content -->
		<!-- footer -->
		<div id="footer">
			<p>Copyright &copy; 2012-2014 TeaShop. All Rights Reserved.</p>
		</div>
		<!-- end footert -->
	</body>
</html>