package cn.yueying.teashop.dao;

import java.util.List;
import cn.yueying.teashop.model.TeaShopManager;

public interface TeaShopManagerDao {

	public TeaShopManager findById(int id);

	public TeaShopManager save(TeaShopManager tsm);

	public List<TeaShopManager> findByUsername(String username);

}
