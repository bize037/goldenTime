package com.example.GoldenTime.controller;

import com.example.GoldenTime.entity.Avail;
import com.example.GoldenTime.entity.Locate;
import com.example.GoldenTime.service.AvailService;
import com.example.GoldenTime.service.LocateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@RequiredArgsConstructor
@Controller
public class MapController {

    @Autowired
    private final LocateService locateService;

    @Autowired
    private final AvailService availService;

    @GetMapping("/")
    public String index(Model model){
        List<Locate> locateList = locateService.locate();
        List<Avail> avail = availService.avail();
        model.addAttribute("locateList", locateList);
        model.addAttribute("avail", avail);
        return "index";
    }
}
