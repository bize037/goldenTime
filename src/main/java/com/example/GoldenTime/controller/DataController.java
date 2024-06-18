package com.example.GoldenTime.controller;

import com.example.GoldenTime.entity.Avail;
import com.example.GoldenTime.entity.Locate;
import com.example.GoldenTime.service.AvailService;
import com.example.GoldenTime.service.LocateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DataController {

    @Autowired
    private LocateService locateService;

    @Autowired
    private AvailService availService;

    @GetMapping("/cityOption")
    public ResponseEntity<Map<String, Object>> postLocal(@RequestParam(value="local", required=false) String local) {
        List<Avail> selectLocal = availService.selectLocal(local);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("selectLocal", selectLocal);

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchtwo(@RequestParam(value="local", required=false) String local, @RequestParam(value="city", required=false) String city) {
        List<Avail> possHosp = availService.localsearch(local, city);
        List<Locate> searchCity = locateService.locatemap(local, city);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("searchCity", searchCity);
        responseData.put("possHosp", possHosp);

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/searchall")
    public ResponseEntity<Map<String, Object>> searchall(@RequestParam(value="keyword", required=false) String keyword) {
        List<Avail> searchAvail = availService.searchAll(keyword, keyword, keyword);
        List<Locate> searchLocate = locateService.searchAll(keyword, keyword, keyword);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("searchCity", searchLocate);
        responseData.put("possHosp", searchAvail);

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/hosp")
    public  ResponseEntity<Map<String, Object>> searchthree(@RequestParam(value="idx", required=false) Integer idx) {
        List<Avail> AvailList = availService.findidx(idx);
        List<Locate> LocateList = locateService.findidx(idx);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("AvailList", AvailList);
        responseData.put("LocateList", LocateList);

        return ResponseEntity.ok(responseData);
    }
}
