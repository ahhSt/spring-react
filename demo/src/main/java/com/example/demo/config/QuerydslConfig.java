package com.example.demo.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuerydslConfig {
//    *EntityManagerFactory
//    여기선 사용하지 않았다.
//    request가 올 때 EntityManager를 생성한다.

//    *JPAQueryFactory
//    JPAQuery를 만들어서 사용하는 방식
//    EntityManager를 통해서 질의가 처리된다.
//    사용하는 쿼리문은 JPQL
//    최종 목표는 JPA와 QueryDSL이기 때문에 사용

//    *EntityManager
//    Transaction 단위로 생성된다.
//    DB connection pool을 사용한다.
//    Transaction이 끝나면 버린다. 다른 Thread와 공유하면 안된다.

//    *PersistenceContext
//    persistence 뜻 : 지속하다.
//    위 소스코드 기준으로는 EntityManager를 영구 저장하겠다. 로 쓰인다.
    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }
}
