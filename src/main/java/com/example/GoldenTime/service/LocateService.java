package com.example.GoldenTime.service;

import com.example.GoldenTime.entity.Avail;
import com.example.GoldenTime.entity.Locate;
import com.example.GoldenTime.repository.LocateRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class LocateService {
    private LocateRepository locateRepository;

    public LocateService(LocateRepository locateRepository) {
        this.locateRepository = locateRepository;
    }

    @Transactional
    public List<Locate> searchAll(String local, String city, String dutyname) {
        List<Locate> searchAll = locateRepository.findByLocalContainingOrCityContainingOrDutynameContaining(local, city, dutyname);
        return searchAll;
    }

    @Transactional
    public List<Locate> locate() {
        List<Locate> locateList = locateRepository.findAll();
        return locateList;
    }

    @Transactional
    public List<Locate> locatemap(String local, String city) {
        List<Locate> locatemap = locateRepository.findByLocalAndCity(local, city);
        return locatemap;
    }

    @Transactional
    public List<Locate> findidx(Integer idx) {
        List<Locate> findidx = locateRepository.findByIdx(idx);
        return findidx;
    }

}
