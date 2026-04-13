package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import com.example.backend.DTO.StudentDTO;

public interface StudentService {
    List<StudentDTO> getAllStudents();
    Optional<StudentDTO> getStudentById(Long id);
    StudentDTO createStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    void deleteStudent(Long id);
}