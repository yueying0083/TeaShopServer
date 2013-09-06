var x_format = [ "%H", "%y-%m-%d", "%y-%m", "%y年" ];
var s_format = [ "yyyy-MM-dd hh", "yyyy-MM-dd", "yyyy-MM", "yyyy" ];
var c_format = s_format[0];

// 扩展Date的format方法
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

var option = {
	lines : {
		show : true
	},
	points : {
		show : true
	},
	grid : {
		backgroundColor : '#fffaff',
		hoverable : true,
		clickable : true
	},
	legend : {
		show : false
	},
	xaxis : {
		mode : "time",
		timeformat : "%H"
	}
};

$(document)
		.ready(
				function() {
					$('#sales').css({
						height : '200px',
						width : 'auto'
					});

					function showTooltip(x, y, contents) {
						$('<div id="tooltip">' + contents + '</div>').css({
							position : 'absolute',
							display : 'none',
							top : y + -36,
							left : x + -6,
							border : '1px solid #fdd',
							padding : '4px',
							'background-color' : '#fee',
							opacity : 0.80
						}).appendTo("body").fadeIn(200);
					}

					var previousPoint = null;

					$("#sales")
							.bind(
									"plothover",
									function(event, pos, item) {
										$("#x").text(pos.x.toFixed(2));
										$("#y").text(pos.y.toFixed(2));

										if (item) {
											if (previousPoint != item.datapoint) {
												previousPoint = item.datapoint;

												$("#tooltip").remove();
												var x = item.datapoint[0], y = item.datapoint[1]
														.toFixed(2);
												showTooltip(
														item.pageX,
														item.pageY,
														item.series.label
																+ " "
																+ new Date(x)
																		.format(c_format)
																+ " "
																+ Math.round(y));
											}
										} else {
											$("#tooltip").remove();
											previousPoint = null;
										}
									});
				});

function view_plot(title, type_a, title_a, type_b, title_b, d_type) {
	$('#box').css("display", "hidden");
	$('#box_1').css("display", "hidden");

	if (type_a != '') {
		// ajax request here
		var myDate = new Date();
		var n_y = myDate.getFullYear();
		var n_m = myDate.getMonth() + 1;
		var n_d = myDate.getDate();
		myDate.setDate(myDate.getDate() - 1);
		var o_y = myDate.getFullYear();
		var o_m = myDate.getMonth() + 1;
		var o_d = myDate.getDate();
		var post_data = "";
		switch (d_type) {
		case 3:
			post_data = "&s_t=" + "2012-01-01 00" + "&e_t=" + n_y
					+ "-12-31 24&requestType=" + 3;
			break;
		case 2:
			post_data = "&s_t=" + (n_y - 1) + "-" + n_m + "-01 00" + "&e_t="
					+ n_y + "-" + n_m + "-01 24&requestType=" + 2;
			break;
		case 1:
			var t_m = n_m - 1;
			var t_y = t_m == 0 ? n_y - 1 : n_y;
			t_m = t_m == 0 ? 12 : t_m;
			post_data = "&s_t=" + t_y + "-" + t_m + "-" + n_d + " 00" + "&e_t="
					+ o_y + "-" + o_m + "-" + o_d + " 24&requestType=" + 1;
			break;
		case 0:
			post_data = "&s_t=" + o_y + "-" + o_m + "-" + o_d + " 00" + "&e_t="
					+ o_y + "-" + o_m + "-" + o_d + " 24&requestType=" + 0;
			break;
		}
		var ds = [];
		$.ajax({
			url : "viewHitCount.action",
			type : 'post',
			async : false,
			dataType : 'json',
			data : "types=" + type_a + post_data,
			success : function(mm) {
				switch (mm.statusCode) {
				case 1:
					alert("时间参数错误");
					return;
				case 254:
					alert("登陆超时");
					login();
					return;
				}
				ds = $.parseJSON(mm.josnStr);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});

		var types = type_a.split(",");
		var l = types.length;
		data = [];
		var i = 0;
		$('#legend1').html("");
		for (; i < l; i++) {
			var add_data = {};
			$('#legend1').append(
					$('<li class=\'color' + (i + 1) + '\'>' + ds[i].label
							+ '</li>'));
			add_data.label = ds[i].label;
			add_data.data = ds[i].dataArray;
			data.push(add_data);
		}
		$('#sales').css({
			height : '200px',
			width : 'auto'
		});
		option.xaxis.timeformat = x_format[d_type];
		c_format = s_format[d_type];
		$.plot($("#sales"), data, option);
		$('#box').css("display", "display");
	}
}
function login() {
	$('#login').dialog('open');
}

function add_code() {
	$('#add-code').dialog("open");
}

function isPermissionSelected() {

	return false;
}

$(document).ready(
		function() {
			$('#login').dialog({
				autoOpen : false,
				height : 260,
				width : 420,
				modal : true,
				buttons : {
					'Login' : function() {
						IsValid();
					},
					Cancel : function() {
						$(this).dialog('close');
					}
				},
				close : function() {
					// allFields.val('').removeClass('ui-state-error');
				}
			});

			$('#add-code').dialog(
					{
						autoOpen : false,
						height : 220,
						width : 400,
						modal : true,
						buttons : {
							'Add' : function() {
								if (!isNaN($("#add_code").val())) {
									$.ajax({
										url : "insertTypeDesc.action",
										type : 'post',
										async : false,
										dataType : 'json',
										data : "typeDesc.typeId="
												+ $("#add_code").val()
												+ "&typeDesc.typeDesc="
												+ $("#add_desc").val(),
										success : function(mm) {
											switch (mm.statusCode) {
											case 2:
												alert("验证码错误");
												return;
											case 1:
												alert("编码已存在！");
												return;
											}
											alert("添加成功");
											$('#add-code').dialog("close");
										},
										error : function(xhr, ajaxOptions,
												thrownError) {
											alert(xhr.status);
											alert(thrownError);
										}
									});
								} else {
									alert("编码必须是纯数字！");
								}

							},
							Cancel : function() {
								$(this).dialog('close');
							}
						},
						close : function() {
							// allFields.val('').removeClass('ui-state-error');
						}
					});

			$('#code-list').dialog({
				autoOpen : false,
				height : 520,
				width : 400,
				modal : true,
				buttons : {
					Cancel : function() {
						$(this).dialog('close');
					}
				},
				close : function() {
					// allFields.val('').removeClass('ui-state-error');
				}
			});

			$('#code-select-list').dialog(
					{
						autoOpen : false,
						height : 520,
						width : 400,
						modal : true,
						buttons : {
							'select' : function() {
								var data = "";
								var arrayObj = document
										.getElementsByName("codeList");
								for ( var i = 0; i < arrayObj.length; i++) {
									if (arrayObj[i].checked
											&& arrayObj[i].type == 'checkbox') {
										data += arrayObj[i].value + ",";
									}
								}
								$.ajax({
									url : "stat/getSelectedCodeList.action",
									type : 'post',
									async : false,
									dataType : 'json',
									data : "selectedTypeIds=" + data,
									success : function(data) {
										switch (data.statusCode) {
										case 1:
											alert("时间参数错误");
											return false;
										case 254:
											alert("登陆超时");
											login();
											return false;
										}
										ds = $.parseJSON(data.josnStr);
										$("#input_types").val(ds);
									},
									error : function(xhr, ajaxOptions,
											thrownError) {
										alert(xhr.status);
										alert(thrownError);
									}
								});
								$(this).dialog('close');
							},
							Cancel : function() {
								$(this).dialog('close');
							}
						},
						close : function() {
							// allFields.val('').removeClass('ui-state-error');
						}
					});
		});

function IsValid() {
	var c = checkLength($("#a_userid"), 2, 25);
	c = c && checkLength($("#a_pwd"), 2, 15);
	if (c) {
		$.ajax({
			url : "../admin/ajaxLogin.action",
			type : 'post',
			async : false,
			dataType : 'json',
			data : "adminName=" + $("#a_userid").val() + "&adminPassword="
					+ $("#a_pwd").val() + "&verifyCode="
					+ $("#verifyCode").val(),
			success : function(mm) {
				switch (mm.statusCode) {
				case 4097:
					alert("验证码错误");
					change();
					return;
				case 4099:
					alert("密码错误");
					change();
					return;
				}
				window.location.href = "../stat/";
			},
			error : function(xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
	}
	return false;
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

function code_list() {
	var ds = [];
	$.ajax({
		url : "viewCodeList.action",
		type : 'post',
		async : false,
		dataType : 'json',
		data : "",
		success : function(mm) {
			switch (mm.statusCode) {
			case 1:
				alert("时间参数错误");
				return false;
			case 254:
				alert("登陆超时");
				login();
				return false;
			}
			ds = $.parseJSON(mm.josnStr);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});
	var l = ds.length;
	var i = 0;
	$("ul#code_list").html("");
	for (; i < l; i++) {
		$("ul#code_list")
				.append(
						"<li id='"
								+ ds[i].typeId
								+ "'>"
								+ ds[i].typeId
								+ "\t"
								+ ds[i].typeDesc
								+ "&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='删除' onclick='delTypeDesc("
								+ ds[i].typeId + ")'/></li>");
	}
	$('#code-list').dialog("open");
}

function code_select_list() {
	var ds = [];
	$.ajax({
		url : "stat/viewCodeList.action",
		type : 'post',
		async : false,
		dataType : 'json',
		data : "",
		success : function(mm) {
			switch (mm.statusCode) {
			case 1:
				alert("时间参数错误");
				return false;
			case 254:
				alert("登陆超时");
				login();
				return false;
			}
			ds = $.parseJSON(mm.josnStr);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});
	var l = ds.length;
	var i = 0;
	$("ul#code_select_list").html("");
	if (l > 0) {
		for (; i < l; i++) {
			$("ul#code_select_list").append(
					"<li><input type='checkbox' name='codeList' value='"
							+ ds[i].typeId + "'/>" + ds[i].typeId + "\t"
							+ ds[i].typeDesc + "</li>");
		}
	}
	$('#code-select-list').dialog("open");
}

function change() {
	document.getElementById("verifyImage").src = "../admin/imageAction.action"
			+ "?id=" + (++i);
}

function go() {
	var s_t = $("#input_date1").val();
	var e_t = $("#input_date2").val();
	var s_t_l = new Date(Date.parse(s_t));
	var e_t_l = new Date(Date.parse(e_t));
	if (s_t_l == "Invalid Date") {
		$("#input_date1").addClass("error");
		return;
	}
	if (e_t_l == "Invalid Date") {
		$("#input_date2").addClass("error");
		return;
	}
	if (s_t_l > e_t_l) {
		$("#input_date1").addClass("error");
		$("#input_date2").addClass("error");
		return;
	}
	var d_type = $("#input_xaxis").val();
	if (d_type == "0") {
		d_type = 0;
		if (e_t_l - s_t_l > 172800000) {
			alert("以Hour为标准是跨度不能超过2天");
			$("#input_date1").addClass("error");
			$("#input_date2").addClass("error");
			return false;
		}
	} else if (d_type == "1") {
		d_type = 1;
		if (e_t_l - s_t_l > 172800000 * 30) {
			alert("以Day为标准是跨度不能超过2个月");
			$("#input_date1").addClass("error");
			$("#input_date2").addClass("error");
			return false;
		}
	} else if (d_type == "2") {
		d_type = 2;
		if (e_t_l - s_t_l > 172800000 * 30 * 12) {
			alert("以Month为标准是跨度不能超过2年");
			$("#input_date1").addClass("error");
			$("#input_date2").addClass("error");
			return false;
		}
	} else if (d_type == "3") {
		// Ignore
		d_type = 3;
	}
	s_t += " 00";
	e_t += " 24";
	var post_data = "&s_t=" + s_t + "&e_t=" + e_t + "&requestType=" + d_type;
	var type_a = $("#input_types").val();

	var ds = [];
	$.ajax({
		url : "viewHitCount.action",
		type : 'post',
		async : false,
		dataType : 'json',
		data : "types=" + type_a + post_data,
		success : function(mm) {
			switch (mm.statusCode) {
			case 1:
				alert("时间参数错误");
				return false;
			case 254:
				alert("登陆超时");
				login();
				return false;
			}
			ds = $.parseJSON(mm.josnStr);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});

	var types = type_a.split(",");
	var l = types.length;
	data = [];
	var i = 0;
	$('#legend1').html("");
	for (; i < l; i++) {
		var add_data = {};
		$('#legend1')
				.append(
						$('<li class=\'color' + (i + 1) + '\'>' + ds[i].label
								+ '</li>'));
		add_data.label = ds[i].label;
		add_data.data = ds[i].dataArray;
		data.push(add_data);
	}
	$('#sales').css({
		height : '200px',
		width : 'auto'
	});
	option.xaxis.timeformat = x_format[d_type];
	c_format = s_format[d_type];
	$.plot($("#sales"), data, option);
	$('#box').css("display", "display");
	return false;
}

function showStatResults() {
	var s_t = $("#input_date1").val();
	var e_t = $("#input_date2").val();
	var s_t_l = new Date(Date.parse(s_t));
	var e_t_l = new Date(Date.parse(e_t));
	if (s_t_l == "Invalid Date") {
		$("#input_date1").addClass("error");
		return;
	}
	if (e_t_l == "Invalid Date") {
		$("#input_date2").addClass("error");
		return;
	}
	if (s_t_l > e_t_l) {
		$("#input_date1").addClass("error");
		$("#input_date2").addClass("error");
		return;
	}

	s_t += " 00";
	e_t += " 24";
	var post_data = "&s_t=" + s_t + "&e_t=" + e_t;
	var type_a = $("#input_types").val();

	var ds = [];
	$.ajax({
		url : "stat/getUserStatResults.action",
		type : 'post',
		async : false,
		dataType : 'json',
		data : "types=" + type_a + post_data,
		success : function(mm) {
			switch (mm.statusCode) {
			case 1:
				alert("时间参数错误");
				return false;
			case 254:
				alert("登陆超时");
				login();
				return false;
			}
			ds = $.parseJSON(mm.josnStr);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});

	var i = 0;
	$("#stat_results").html("");
	$("#stat_results")
			.append(
					"<li><span class='paiming_blue_text'>编号</span>"
							+ "<span class='ranking_li_span'>用户名</span><span class='rank_xq'>次数</span></li>");
	if (ds.length > 0) {
		for (; i < ds.length; i++) {
			$("#stat_results").append(
					"<li><i class='paiming_blue'>" + (i + 1) + "</i>"
							+ "<a href='javascript:showUserDetails("
							+ ds[i].user.id + ")'>" + ds[i].user.userName
							+ "</a><span class='rank_xq'>" + ds[i].count
							+ "</span></li>");
		}
	}
	return false;

}

/*
 * function checkTypeId() { $.ajax({ url : "checkTypeId.action", type : 'post',
 * async : false, dataType : 'json', data : "typeDesc.typeId=" +
 * $("#add_code").val(), success : function(count) { if (count == '1') {
 * $("#input_warning").html("编码已存在！"); } }, error : function(xhr, ajaxOptions,
 * thrownError) { alert(xhr.status); alert(thrownError); } }); }
 */

function delTypeDesc(id) {
	$.ajax({
		url : "delTypeDesc.action",
		type : 'post',
		async : false,
		dataType : 'json',
		data : "typeDesc.typeId=" + id,
		success : function(status) {
			if (status == '1') {
				$("#" + id).remove();
				alert("删除成功");
			} else {
				alert("删除失败");
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});
}
