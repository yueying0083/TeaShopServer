package cn.yueying.teashop.dao.impl;

import java.util.List;
import org.springframework.stereotype.Component;
import cn.yueying.teashop.dao.BaseDao;
import cn.yueying.teashop.dao.TeaShopManagerDao;
import cn.yueying.teashop.model.TeaShopManager;

@Component("TeaShopManagerDao")
public class TeaShopManagerDaoImpl extends BaseDao<TeaShopManager> implements
		TeaShopManagerDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<TeaShopManager> findByUsername(String username) {
		return getHibernateTemplate().find("from TeaShopManager t where t.username = ? ", username);
	}

}
