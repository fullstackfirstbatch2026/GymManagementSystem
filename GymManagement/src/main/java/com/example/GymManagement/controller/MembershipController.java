package com.example.GymManagement.controller;

import com.example.GymManagement.entity.Membership;
import com.example.GymManagement.entity.MembershipRequest;
import com.example.GymManagement.entity.ExpiryDateRequest;
import com.example.GymManagement.service.MembershipService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/memberships")
public class MembershipController {

    private final MembershipService service;

    public MembershipController(MembershipService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Membership addMembership(
            @RequestBody Membership membership) {

        return service.addMembership(membership);
    }

    // READ ALL
    @GetMapping
    public List<Membership> getAllMemberships() {

        return service.getAllMemberships();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Membership getMembershipById(
            @PathVariable int id) {

        return service.getMembershipById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Membership updateMembership(
            @PathVariable int id,
            @RequestBody Membership membership) {

        return service.updateMembership(id, membership);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteMembership(
            @PathVariable int id) {

        return service.deleteMembership(id);
    }

    // STORED PROCEDURE
    @PostMapping("/register")
    public String registerMembership(
            @RequestBody MembershipRequest request) {

        service.registerMembership(
                request.getMemberId(),
                request.getTrainerId(),
                request.getPlanId(),
                request.getStartDate(),
                request.getExpiryDate(),
                request.getStatus()
        );

        return "Membership registered successfully";
    }

    // MYSQL FUNCTION
    @PostMapping("/calculate-expiry")
    public LocalDate calculateExpiryDate(
            @RequestBody ExpiryDateRequest request) {

        return service.calculateExpiryDate(
                request.getStartDate(),
                request.getDurationMonths()
        );
    }
}