package cn.yueying.teashop.interceptor;

import java.util.Map;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class AuthInterceptor extends AbstractInterceptor {
	private static final long serialVersionUID = -5114658085937727056L;
	public static final String SESSION_KEY = "loginName";
	private String parmKey = "withoutAuthentication";
	private boolean excluded;

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		ActionContext ac = invocation.getInvocationContext();
		excluded = "login".equals(ac.getName());
		Map<?, ?> session = ac.getSession();
		String parm = (String) ac.getParameters().get(parmKey);
		if (parm != null) {
			excluded = excluded || parm.toUpperCase().equals("TRUE");
		}
		String user = (String) session.get(SESSION_KEY);
		if (excluded || user != null) {
			return invocation.invoke();
		}
		ac.put("tip", "timeout");
		return Action.LOGIN;
	}
}