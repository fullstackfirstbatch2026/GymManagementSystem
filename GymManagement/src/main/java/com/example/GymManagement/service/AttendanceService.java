package com.example.GymManagement.service;

import com.example.GymManagement.entity.Attendance;
import com.example.GymManagement.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceService(AttendanceRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Attendance addAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    // READ ALL
    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }

    // READ BY ID
    public Attendance getAttendanceById(int id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    public Attendance updateAttendance(int id, Attendance attendance) {

        Attendance existing = repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setMember(attendance.getMember());
            existing.setAttendanceDate(attendance.getAttendanceDate());
            existing.setStatus(attendance.getStatus());

            return repository.save(existing);
        }

        return null;
    }

    // DELETE
    public String deleteAttendance(int id) {
        repository.deleteById(id);
        return "Attendance deleted successfully";
    }

    // JOIN
    public List<Object[]> getMemberAttendanceMembership() {
        return repository.getMemberAttendanceMembership();
    }

    // SUBQUERY
    public List<Object[]> getMembersAboveAverageAttendance() {
        return repository.getMembersAboveAverageAttendance();
    }
}