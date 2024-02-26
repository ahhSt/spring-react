package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class DemoController {

    @GetMapping("/api/hello")
    public String test(){
        return "Hello, world!";
    }


//    @PostMapping("/api/upload")
//    public String upload(@ModelAttribute UploadDto dto, Model model) {
//        List<FileDto> list = uploadService.save(dto);
//        model.
//        return "index";
//    }
}
