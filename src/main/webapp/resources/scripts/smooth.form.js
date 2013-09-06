/* this function styles inputs with the type file. It basically replaces browse or choose with a custom button */
(function($) {
	$.fn.file = function(options) {
		var settings = {
			width : 250
		};

		if (options) {
			$.extend(settings, options);
		}

		this.each(function() {
			var self = this;

			var wrapper = $("<a>").attr("class", "ui-input-file");

			var filename = $('<input class="file">').addClass(
					$(self).attr("class")).css({
				"display" : "inline",
				"width" : settings.width + "px"
			});

			$(self).before(filename);
			$(self).wrap(wrapper);

			$(self).css({
				"position" : "relative",
				"height" : settings.image_height + "px",
				"width" : settings.width + "px",
				"display" : "inline",
				"cursor" : "pointer",
				"opacity" : "0.0"
			});

			if ($.browser.mozilla) {
				if (/Win/.test(navigator.platform)) {
					$(self).css("margin-left", "-142px");
				} else {
					$(self).css("margin-left", "-168px");
				}
				;
			} else {
				$(self).css("margin-left",
						settings.image_width - settings.width + "px");
			}
			;

			$(self).bind("change", function() {
				filename.val($(self).val());
			});
		});

		return this;
	};
})(jQuery);

$(function() {
	$("#menu_item_group_add").click(function() {
		$("#head_item_group_add").dialog("open");
	});

	$("#head_item_group_add")
			.dialog(
					{
						autoOpen : false,
						height : 500,
						width : 600,
						modal : true,
						buttons : {
							'Create a Group' : function() {
								var dataGroup = "taobaoUlikeItemGroup.groupName="
										+ $("#item_group_name").val();
								dataGroup += "&taobaoUlikeItemGroup.groupDesc="
										+ $("#item_group_desc").val();
								dataGroup += "&taobaoUlikeItemGroup.imgUrl="
										+ $("#groupPicImg").attr("src");
								$
										.ajax({
											url : "saveTaobaoItemGroup.action",
											type : "post",
											data : dataGroup,
											dataType : 'json',

											success : function(data) {
												switch (data.statusCode) {
												case 0:
													alert("发布成功");
													$("#head_item_group_add")
															.dialog("close");
													break;
												case 254:
													alert("登陆超时!");
													$("#login_dialog").dialog(
															"open");
													return;
												case 255:
													alert("尚未绑定NEAR ME账号!");
													window.location.href = "admin/index.action";
													return;
												}
												$(this).dialog("close");

											},
											error : function(xhr, ajaxOptions,
													thrownError) {
												alert(xhr.status);
												alert(thrownError);
											}
										});
							},
							Cancel : function() {
								$(this).dialog('close');
							}
						},
						close : function() {
							allFields.val('').removeClass('ui-state-error');
							$("#item_group_name").val("");
							$("#item_group_imgUrl").val("");
							$("#item_group_textarea").val("");
						}
					});

	$("#login_dialog").dialog(
			{
				autoOpen : false,
				height : 300,
				width : 500,
				modal : true,
				buttons : {
					'Login' : function() {

						var dataGroup = "adminName="
								+ $("#ajax_login_user_name").val();
						dataGroup += "&adminPassword="
								+ $("#ajax_login_password").val();
						dataGroup += "&verifyCode="
								+ $("#ajax_login_verify_code").val();

						$.ajax({
							url : "../ajaxLogin.action",
							type : "post",
							data : dataGroup,
							dataType : 'json',

							success : function(data) {
								switch (data.statusCode) {
								case 0:
									alert("登陆成功");
									$("#login_dialog").dialog('close');
									break;
								case 253:
									alert("用户名/密码错误");
									return;
								}
								$(this).dialog("close");

							},
							error : function(xhr, ajaxOptions, thrownError) {
								alert(xhr.status);
								alert(thrownError);
							}
						});
					},
					Cancel : function() {
						$(this).dialog('close');
					}
				},
				close : function() {
				}
			});

	$("#nearme-dialog-form").dialog({
		autoOpen : false,
		modal : true,
		buttons : {
			添加 : function() {
				var dataGroup = "requestUserHelper.loginName=";
				dataGroup += $("#ajax_nearme_login_user_name").val();
				dataGroup += "&requestUserHelper.passWord=";
				dataGroup += $("#ajax_nearme_login_password").val();

				$.ajax({
					url : "../admin/nearmeLogin.action",
					type : "post",
					data : dataGroup,
					dataType : 'json',

					success : function(data) {
						switch (data.statusCode) {
						case 0:
							alert("绑定成功");
							location.reload();
							break;
						case 2:
							alert("内部错误");
							alert(data.jsonStr);
							break;
						case 254:
							alert("登陆超时!");
							$("#login_dialog").dialog("open");
							return;
						case 3:
							alert("neame链接错误\t" + data.josnStr);
							break;
						}
					},
					error : function(xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			},
			取消 : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
		}
	});

	$("#loading-dialog").dialog({
		autoOpen : false,
		modal : true,
		close : function() {
		}
	});
	
    /* date picker */
    $(".date").datepicker({
    	dateFormat: 'yy-mm-dd',
        showOn: 'both',
        buttonImage: '../resources/images/ui/calendar.png',
        buttonImageOnly: true
    });

    /* select styling */
    $("select").selectmenu({
        style: 'dropdown',
        width: 200,
        menuWidth: 200,
        icons: [
		    { find: '.locked', icon: 'ui-icon-locked' },
		    { find: '.unlocked', icon: 'ui-icon-unlocked' },
		    { find: '.folder-open', icon: 'ui-icon-folder-open' }
	    ]
    });

	/* button styling */
	$("input:submit").button();
});