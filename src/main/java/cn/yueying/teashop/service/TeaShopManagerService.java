package cn.yueying.teashop.service;

public interface TeaShopManagerService {

	public boolean VerifyManager(String username, String password);

	public void saveManager(String username, String password);

}
