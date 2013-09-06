package cn.yueying.teashop.dao;

import javax.annotation.Resource;

import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class BaseDao<T> extends HibernateDaoSupport {

	@Resource
	public void setHibernateTemplate1(HibernateTemplate hibernateTemplate) {
		super.setHibernateTemplate(hibernateTemplate);
	}

	public T save(T t) {
		getHibernateTemplate().save(t);
		return t;
	}

	@SuppressWarnings("unchecked")
	public T findById(int id) {
		return (T) getHibernateTemplate().get("id", id);
	}

}
