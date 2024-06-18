package com.example.GoldenTime.repository;

import com.example.GoldenTime.entity.Avail;
import com.example.GoldenTime.entity.Locate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface AvailRepository extends CrudRepository<Avail, Integer> {
    @Override
    ArrayList<Avail> findAll();

    ArrayList<Avail> findByLocalAndCity(String local, String city);

    ArrayList<Avail> findByLocalContainingOrCityContainingOrDutynameContaining(String local, String city, String dutyname);

    ArrayList<Avail> findByLocal(String local);

    ArrayList<Avail> findByIdx(Integer idx);
}
