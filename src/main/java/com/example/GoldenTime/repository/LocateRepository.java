package com.example.GoldenTime.repository;

import com.example.GoldenTime.entity.Locate;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface LocateRepository extends CrudRepository<Locate, Integer> {
    @Override
    ArrayList<Locate> findAll();

    ArrayList<Locate> findByLocalAndCity(String local, String city);

    ArrayList<Locate> findByLocalContainingOrCityContainingOrDutynameContaining(String local, String city, String dutyname);

    ArrayList<Locate> findByIdx(Integer idx);
}

