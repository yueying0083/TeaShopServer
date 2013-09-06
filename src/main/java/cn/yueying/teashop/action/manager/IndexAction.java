package cn.yueying.teashop.action.manager;

import cn.yueying.teashop.model.TeaShopManager;
import com.opensymphony.xwork2.ActionSupport;

public class IndexAction extends ActionSupport {

	private static final long serialVersionUID = 1504902577085124736L;
	private TeaShopManager teaShopManager;

	public TeaShopManager getTeaShopManager() {
		return teaShopManager;
	}

	public void setTeaShopManager(TeaShopManager teaShopManager) {
		this.teaShopManager = teaShopManager;
	}

	@Override
	public String execute() {
		return SUCCESS;
	}

}
