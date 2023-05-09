package com.example.demo.repository;

import com.example.demo.domain.Domain;
//import org.springframework.transaction.annotation.Transactional;
import com.example.demo.dto.DomainDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {
    Optional<Domain> findById(Long id);

    //비워있어도 잘 작동함.
    // long 이 아니라 Long으로 작성. ex) int => Integer 같이 primitive형식 사용못함

    // findBy뒤에 컬럼명을 붙여주면 이를 이용한 검색이 가능하다
//    Page<DomainDto> findAllByName(String name, Pageable pageable);
//    List<DomainDto> findByName(String name);
//
//    //like검색도 가능
//    List<DomainDto> findByNameLike(String keyword);
//
//    Page<DomainDto> findAll(Pageable page);
//
//    public Page<DomainDto> findByBnoGreaterThan(Long bno,Pageable paging);

////    Querydsl를 이용하는 경우 엔티티와 다른 반환 타입인 경우 Projections를 사용합니다. Projections을 하는 방법과 선호하는 패턴을 정리해보았습니다.
////
////    Projections을 이용해서 projection 하는 방법은 크게 3가지가 있습니다.
////
////    1. Projections.bean을 이용하는 방법
////    2. Projections.constructor를 이용하는 방법
////    3. @QueryProjection를 사용하는 방법 : ex) QDomainDto
//    public Optional<Domain> exist(String domainId) {
//        Domain domains = queryFactory
//                .selectFrom(domain)
//                .where(domain.id.eq(domainId))
//                .fetchFirst();
//
//        return Optional.ofNullable(domains);
//    }
//
//
//    public Page<DomainDto> search(Pageable pageable) {
//        List<DomainDto> content = queryFactory
//                .select(new QDomainDto(
//                        domain.id.as("domainId"),
//                        domain.korName,
//                        domain.engName,
//                        domain.engInitName,
//                        domain.length,
//                        domain.dataTypes.id.as("dataTypeId"),
//                        domain.description
//                ))
//                .from(domain)
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//
//        JPAQuery<Domain> countQuery = queryFactory
//                .selectFrom(domain)
//                ;
//
//        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
//    }
//
////    private BooleanExpression usernameEq(String username) {
////        return hasText(username) ? member.username.eq(username) : null;
////    }
////
////    private BooleanExpression teamNameEq(String teamName) {
////        return hasText(teamName) ? team.name.eq(teamName) : null;
////    }
////
////    private BooleanExpression ageGoe(Integer ageGoe) {
////        return ageGoe != null ? member.age.goe(ageGoe) : null;
////    }
////
////    private BooleanExpression ageLoe(Integer ageLoe) {
////        return ageLoe != null ? member.age.loe(ageLoe) : null;
////    }
////
////    private BooleanExpression ageBetween(Integer ageLoe, Integer ageGoe) {
////        return ageLoe(ageLoe).and(ageGoe(ageGoe));
////    }
//    @Transactional
//    public void insert(Domain domain){
//        em.persist(domain);
//    }
//
//    @Transactional
//    public void delete(String domainId) {
//
//        queryFactory.delete(domain)
//                .where(domain.id.eq(domainId))
//                .execute();
//        em.flush();
//        em.clear();
//    }

}