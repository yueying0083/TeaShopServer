package cn.yueying.teashop.action;

import javax.annotation.Resource;
import cn.yueying.teashop.model.TeaShopManager;
import cn.yueying.teashop.service.TeaShopManagerService;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {

	private static final long serialVersionUID = -8891109969465499793L;

	private TeaShopManagerService mTeaShopManagerService;
	private TeaShopManager teashopManager;

	@Resource(name = "TeaShopManagerService")
	public void setmTeaShopManagerService(
			TeaShopManagerService mTeaShopManagerService) {
		this.mTeaShopManagerService = mTeaShopManagerService;
	}

	public TeaShopManager getTeashopManager() {
		return teashopManager;
	}

	public void setTeashopManager(TeaShopManager teashopManager) {
		this.teashopManager = teashopManager;
	}

	public String login() {
		return mTeaShopManagerService.VerifyManager(
				teashopManager.getUsername(), teashopManager.getPassword()) ? SUCCESS
				: ERROR;
	}

	public String register() {
		mTeaShopManagerService.saveManager(teashopManager.getUsername(),
				teashopManager.getPassword());
		return SUCCESS;
	}

}
