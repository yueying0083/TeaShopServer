package cn.yueying.teashop.action;

import java.util.Map;

import javax.annotation.Resource;
import cn.yueying.teashop.interceptor.AuthInterceptor;
import cn.yueying.teashop.model.TeaShopManager;
import cn.yueying.teashop.service.TeaShopManagerService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {

	private static final long serialVersionUID = -8891109969465499793L;

	private TeaShopManagerService mTeaShopManagerService;
	private TeaShopManager teashopManager;
	private String verifyCode;

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

	public String getVerifyCode() {
		return verifyCode;
	}

	public void setVerifyCode(String verifyCode) {
		this.verifyCode = verifyCode;
	}

	@SuppressWarnings("unchecked")
	public String login() {
		Object obj = ActionContext.getContext().getSession()
				.get(VerifyImageAction.VERIFY_CODE_STR);
		Map<String, Object> request = (Map<String, Object>) ActionContext.getContext().get("request");
		if (obj != null && obj instanceof String) {
			String str = (String) obj;
			if (str.equals(verifyCode)) {
				if (mTeaShopManagerService.VerifyManager(
						teashopManager.getUsername(),
						teashopManager.getPassword())) {
					ActionContext
							.getContext()
							.getSession()
							.put(AuthInterceptor.SESSION_KEY,
									teashopManager.getUsername());
					return SUCCESS;
				} else {
					request.put("err_msg", 1);
				}
			} else {
				request.put("err_msg", 2);
			}
		}
		return "login";
	}

	public String register() {
		mTeaShopManagerService.saveManager(teashopManager.getUsername(),
				teashopManager.getPassword());
		return SUCCESS;
	}

}
