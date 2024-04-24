package com.v1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.backend.entities.Items;

@Repository
public interface ItemRepository extends JpaRepository<Items, Long>{
    
}
