package com.example.GymManagement.controller;

import com.example.GymManagement.entity.Attendance;
import com.example.GymManagement.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return service.addAttendance(attendance);
    }

    // READ ALL
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return service.getAllAttendance();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable int id) {
        return service.getAttendanceById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Attendance updateAttendance(
            @PathVariable int id,
            @RequestBody Attendance attendance) {

        return service.updateAttendance(id, attendance);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteAttendance(@PathVariable int id) {
        return service.deleteAttendance(id);
    }

    // JOIN
    @GetMapping("/join")
    public List<Object[]> getMemberAttendanceMembership() {
        return service.getMemberAttendanceMembership();
    }

    // SUBQUERY
    @GetMapping("/above-average")
    public List<Object[]> getMembersAboveAverageAttendance() {
        return service.getMembersAboveAverageAttendance();
    }
}