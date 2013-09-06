function _formSubmit() {
	var a = isNaN($("#start_price").val());
	var b = isNaN($("#end_price").val());
	if (!a && !b) {
		return true;
	}
	if (a) {
		$("#start_price").css("border", 1);
		$("#start_price").css("border-color", "red");
	}
	if (b) {
		$("#end_price").css("border", 1);
		$("#end_price").css("border-color", "red");
	}
	alert("价格区间有误!");
	return false;
}

$(document).ready(function() {

	function ajaxStart() {
		$("#loading-dialog").dialog("open");
	}
	function ajaxComplete() {
		$("#loading-dialog").dialog("close");
	}

	$("#loading-dialog").dialog({
		autoOpen : false,
		width : 200,
		height : 200,
		modal : true,
		closeOnEscape : false,
		open : function(event, ui) {
			$($("#loading-dialog").find(".ui-dialog-titlebar-close")[0]).hide();
		}
	});

	$(".taobao_pic_fence .item .div .pic").click(function(e) {
		$("#click-dialog-title").html($(this).find("img")[0].title);
		$("#currentNumIid").val($($(this).find("input")[0]).val());
		$("#item_clickUrl").val($(this).next().find("a")[0].href);
		$("#currentCommission").val($($(this).find("input")[1]).val());
		$("#currentCommissionRate").val($($(this).find("input")[2]).val());
		$("#currentCommissionNum").val($($(this).find("input")[3]).val());
		$("#currentCommissionVolume").val($($(this).find("input")[4]).val());
		queryItemInfo();
	});

	function queryItemInfo() {
		$.ajax({
			url : "admin/taobao/getItem.action",
			type : "post",
			data : "numIid=" + $("#currentNumIid").val(),
			dataType : 'json',
			beforeSend : ajaxStart,
			success : function(data) {
				ajaxComplete();
				switch (data.statusCode) {
				case 0:
					$("#item_json").val(data.josnStr);
					var obj = $.parseJSON(data.josnStr);
					$("#item_title").val(obj.title);
					$("#item_nick").val(obj.nick);
					$("#item_price").val(obj.price);
					$("#item_sellerCreditScore").val(obj.sellerCreditScore);
					$("#item_picUrl").val(obj.picUrl);
					$("#item_img").attr("src", obj.picUrl);
					$("#item_commission").val($("#currentCommission").val());
					$("#add-item-to-group-dialog").dialog("open");
					break;
				case 1:
					alert("未在淘宝中找到该商品，可能已被卖家删除");
					break;
				case 2:
					alert("链接淘宝错误");
					break;
				case 255:
					alert("尚未绑定NEAR ME账号!");
					window.location.href = "admin/index.action";
					return;
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {
				ajaxComplete();
				alert(xhr.status);
				alert(thrownError);
			}
		});
	}
	$("#add-item-to-group-dialog").dialog({
		autoOpen : false,
		modal : true,
		buttons : {
			'Add to Group' : function() {
				var dataGroup = "itemJson=" + encodeURIComponent($("#item_json").val());
				dataGroup += "&taobaoUlikeItem.groupId=" + $("#select").val();
				dataGroup += "&taobaoUlikeItem.titleDesc=" + $("#item_titleDesc").val();
				dataGroup += "&taobaoUlikeItem.clickUrl=" + encodeURIComponent($("#item_clickUrl").val());
				dataGroup += "&taobaoUlikeItem.commission=" + $("#currentCommission").val();
				dataGroup += "&taobaoUlikeItem.commissionRate=" + $("#currentCommissionRate").val();
				dataGroup += "&taobaoUlikeItem.commissionNum=" + $("#currentCommissionNum").val();
				dataGroup += "&taobaoUlikeItem.commissionVolume=" + $("#currentCommissionVolume").val();

				$.ajax({
					url : "admin/taobao/addItemToGroup.action",
					type : "post",
					data : dataGroup,
					dataType : 'json',
					beforeSend : ajaxStart,
					success : function(data) {
						ajaxComplete();
						switch (data.statusCode) {
						case 0:
							alert("添加成功!");
							break;
						case 259:
							alert("淘宝图片下载失败，手机端将使用使用淘宝图片!");
							break;
						case 256:
							alert("登陆超时!");
							$("#login_dialog").dialog("open");
							break;
						}
					},
					error : function(xhr, ajaxOptions, thrownError) {
						ajaxComplete();
						alert(xhr.status);
						alert(thrownError);
					}
				});
				$(this).dialog('close');
			},
			Cancel : function() {
				$(this).dialog('close');
			}
		}
	});
});