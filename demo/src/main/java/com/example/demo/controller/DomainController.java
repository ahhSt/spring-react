package com.example.demo.controller;

import com.example.demo.domain.DataType;
import com.example.demo.domain.Domain;
import com.example.demo.dto.DomainDto;
import com.example.demo.repository.DomainRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/domain")
public class DomainController {
//    private final MemberJpaRepository memberJpaRepository;
    private final DomainRepository domainRepository;

//    @GetMapping("/v1/members")
//    public List<MemberTeamDto> searchMemberV1(MemberSearchCondition condition) {
//        return memberJpaRepository.searchByWhere(condition);
//    }

//    @GetMapping("/v2/members")
//    public Page<MemberTeamDto> searchMemberV2(MemberSearchCondition condition, Pageable pageable){
//        return memberRepository.searchPageSimple(condition, pageable);
//    }
//
//    @GetMapping("/v3/members")
//    public Page<MemberTeamDto> searchMemberV3(MemberSearchCondition condition, Pageable pageable){
//        return memberRepository.searchPageComplex(condition, pageable);
//    }


    @GetMapping("/getAll")
    public Page<DomainDto> search(Pageable pageable){
        return domainRepository.search(pageable);
    }

    @PostMapping("/insert")
    public void insert(@RequestBody DomainDto domainDto) throws Exception{
        try{
            Domain domain = new Domain();
            domain.setId(domainDto.getId());
            domain.setKorName(domainDto.getKorName());
            domain.setEngName(domainDto.getEngName());
            domain.setEngInitName(domainDto.getEngInitName());
            domain.setLength(domainDto.getLength());
            domain.setDescription(domainDto.getDescription());
            //N:1 외래키 값 설정
            DataType dataType = new DataType();
            dataType.setId(domainDto.getDataTypeId());
            domain.setDataTypes(dataType);

            domainRepository.insert(domain);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Insert Error");

        }
    }

    @DeleteMapping("/{doaminId}")
    public void deleteDomainId (@PathVariable String doaminId) throws Exception{
        try {
//            Domain domain = domainRepository.findById(doaminId)
//                    .orElseThrow(IllegalArgumentException::new);
            domainRepository.delete(doaminId);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Delete Error");
        }
    }

}
