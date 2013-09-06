package cn.yueying.teashop.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Component;
import cn.yueying.teashop.dao.TeaShopManagerDao;
import cn.yueying.teashop.model.TeaShopManager;
import cn.yueying.teashop.service.TeaShopManagerService;

@Component("TeaShopManagerService")
public class TeaShopManagerServiceImpl implements TeaShopManagerService {

	private TeaShopManagerDao mTeaShopManagerDao;

	@Resource(name = "TeaShopManagerDao")
	public void setmTeaShopManagerDao(TeaShopManagerDao mTeaShopManagerDao) {
		this.mTeaShopManagerDao = mTeaShopManagerDao;
	}

	@Override
	public boolean VerifyManager(String username, String password) {
		if (username != null && password != null) {
			List<TeaShopManager> list = mTeaShopManagerDao
					.findByUsername(username);
			if (list != null) {
				for (TeaShopManager tsm : list) {
					if (tsm != null && username.equals(tsm.getUsername())
							&& password.equals(tsm.getPassword())) {
						return true;
					}
				}
			}
		}
		return false;
	}

	@Override
	public void saveManager(String username, String password) {
		mTeaShopManagerDao.save(new TeaShopManager(username, password));
	}

}
