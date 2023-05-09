package com.example.demo.service;

import com.example.demo.domain.Customer;
import com.example.demo.domain.Domain;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.QDomainDto;
import com.example.demo.repository.DomainRepository;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

import static com.example.demo.domain.QDomain.domain;

@Slf4j
@Service
@RequiredArgsConstructor
public class DomainService {
    private final DomainRepository domainRepository;

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Transactional(readOnly = true)
    public Page<DomainDto> search(Pageable pageable) {
        List<DomainDto> content = queryFactory
                .select(new QDomainDto(
                        domain.id.as("domainId"),
                        domain.korName,
                        domain.engName,
                        domain.engInitName,
                        domain.length,
                        domain.description,
                        domain.dataTypes.type
                ))
                .from(domain)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Domain> countQuery = queryFactory
                .selectFrom(domain)
                ;

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Transactional(readOnly = true)
    public long getDomainMaxId(){
        long maxId = queryFactory.
                select(domain.id.max())
                .from(domain)
                .fetchOne();
        return maxId;
    }


    @Transactional(readOnly = true)
    public Optional<Domain> getOne(Long id) throws Exception {
        return domainRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Domain findOne(Long domainId) {
        return em.find(Domain.class, domainId);
    }

    @Transactional(readOnly = true)
    public List<Domain> findById(Long domainId) {
        return em.createQuery("select f from Domain f where f.id = :domainId", Domain.class)
                .setParameter("domainId", domainId)
                .getResultList();
    }

    @Transactional
    public void insert(Domain domain) {
        em.persist(domain);
    }

    @Transactional
    public void delete(Domain domain) {
        em.remove(domain);
    }

    private void validateExistDomain(Domain domain) {
        Optional<Domain> findDomain = domainRepository.findById(domain.getId());
        if (findDomain.isEmpty()) {
            throw new IllegalStateException("존재하지 않는 Domain ID 입니다. 삭제할 수 없습니다.");
        }
        else {
            System.out.println("삭제완료");
        }
    }
    @Transactional
    public void deleteById(Domain domain) {
        validateExistDomain(domain); // 존재하는 domain id 인지 검증
        Domain domain1 = findOne(domain.getId());
        em.remove(domain1);
    }



//    @Transactional
//    public Domain save(final Domain domain) {
//        Domain domain = domainRepository.findById(domain.getId()).orElseGet(Domain::new);
//        domain.changeName("용태스토어");
//        CommonUtils.saveIfNullId(domain.getId, domainRepository, domain);
//        return domain;
//    }


}
