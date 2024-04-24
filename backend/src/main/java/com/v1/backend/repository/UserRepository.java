package com.v1.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.User;
import com.v1.backend.entities.enumerate.Role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByIdentification(String identification);

    Page<User> findByRole(Role role, Pageable pageable);

    @Query("SELECT d FROM User u JOIN u.dayWeek d WHERE u.identification = :identification ORDER BY d.fecha DESC")
    Page<DayWeek> findUserRoutine(@Param("identification") String identification, Pageable pageable);

}
