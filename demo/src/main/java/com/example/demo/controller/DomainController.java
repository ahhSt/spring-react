package com.example.demo.controller;

import com.example.demo.domain.Customer;
import com.example.demo.domain.DataType;
import com.example.demo.domain.Domain;
import com.example.demo.dto.DomainDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.service.DomainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/domain")
public class DomainController {
    private final DomainService domainService;

    @GetMapping("/getAll")
    public Page<DomainDto> search(Pageable pageable) throws Exception{
        return domainService.search(pageable);
    }

    @Operation(summary = "findMaxId", description = "Max ID")
    @GetMapping("/getMaxId")
    public long getDomainMaxId() throws Exception{
        return domainService.getDomainMaxId();
    }

//    @Operation(summary = "", description = "")
//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<Domain>> getOne(@Parameter(description = "Domain ID") @PathVariable String id
//    ) throws Exception {
//        Optional<Domain> result = domainService.getOne(id);
//        HttpHeaders header = new HttpHeaders();
//        header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        ResponseEntity<Optional<Domain>> response =  new ResponseEntity<>(result, header, HttpStatus.OK);
//        return response;
//    }

    @Operation(summary = "findOne", description = "API to get information about one FareZoneID.")
    @GetMapping("/getOne")
    public List<DomainDto> getDomainListById(@RequestParam Long domainId) throws Exception{
        List<Domain> fareZones = domainService.findById(domainId);
        List<DomainDto> result = fareZones.stream()
                .map(o -> new DomainDto(o.getId(), o.getKorName(), o.getEngName(), o.getEngInitName(), o.getLength(),
                        o.getDescription(), o.getDataTypes().getType()))
                .collect(Collectors.toList());
        return result;
    }



//    @Operation(summary = "", description = "")
//    @GetMapping("/{id}")
//    public Optional<Domain> getOne(@Parameter(description = "Domain ID") @PathVariable String id
//    ) throws Exception {
//        Optional<Domain> result = domainService.getOne(id);
//        return result;
//    }



    @PostMapping("")
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

            domainService.insert(domain);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Insert Error");

        }
    }

//    @DeleteMapping("/{doaminId}")
//    public void deleteById (@PathVariable Long doaminId) throws Exception{
//        try {
//            Domain domain = domainService.findById(doaminId)
//                    .orElseThrow(IllegalArgumentException::new);
//            domainService.delete(doaminId);
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            throw new Exception("Delete Error");
//        }
//    }

    @Operation(summary = "Delete", description = "API to Delete domainId.")
    @DeleteMapping("/{domainId}")
    public void deleteById(@PathVariable Long domainId){
        Domain domain = new Domain();
        domain.setId(domainId);
        domainService.deleteById(domain);
    }

}
