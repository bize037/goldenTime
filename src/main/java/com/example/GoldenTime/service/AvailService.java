package com.example.GoldenTime.service;


import com.example.GoldenTime.entity.Avail;
import com.example.GoldenTime.repository.AvailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AvailService {
    private AvailRepository availRepository;

    public AvailService(AvailRepository availRepository) {
        this.availRepository = availRepository;
    }

    @Transactional(readOnly = true)
    public List<Avail> searchAll(String local, String city, String dutyname) {
        List<Avail> searchAll = availRepository.findByLocalContainingOrCityContainingOrDutynameContaining(local, city, dutyname);
        return searchAll;
    }

    @Transactional(readOnly = true)
    public List<Avail> avail() {
        List<Avail> availList = availRepository.findAll();
        return availList;
    }

    @Transactional(readOnly = true)
    public List<Avail> localsearch(String local, String city) {
        List<Avail> localsearch = availRepository.findByLocalAndCity(local, city);
        return localsearch;
    }

    @Transactional(readOnly = true)
    public List<Avail> selectLocal(String local) {
        List<Avail> selectLocal = availRepository.findByLocal(local);
        return selectLocal;
    }

    @Transactional(readOnly = true)
    public List<Avail> findidx(Integer idx) {
        List<Avail> findidx = availRepository.findByIdx(idx);
        return findidx;
    }
}
