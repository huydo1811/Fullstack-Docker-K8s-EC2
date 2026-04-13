package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}