package com.example.GymManagement.service;

import com.example.GymManagement.entity.Membership;
import com.example.GymManagement.repository.MembershipRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MembershipService {

    private final MembershipRepository repository;

    public MembershipService(MembershipRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Membership addMembership(Membership membership) {
        return repository.save(membership);
    }

    // READ ALL
    public List<Membership> getAllMemberships() {
        return repository.findAll();
    }

    // READ BY ID
    public Membership getMembershipById(int id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    public Membership updateMembership(
            int id,
            Membership membership) {

        Membership existing =
                repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setMember(membership.getMember());
            existing.setTrainer(membership.getTrainer());
            existing.setPlan(membership.getPlan());
            existing.setStartDate(membership.getStartDate());
            existing.setExpiryDate(membership.getExpiryDate());
            existing.setStatus(membership.getStatus());

            return repository.save(existing);
        }

        return null;
    }

    // DELETE
    public String deleteMembership(int id) {

        repository.deleteById(id);

        return "Membership deleted successfully";
    }

    // STORED PROCEDURE
    public void registerMembership(
            int memberId,
            int trainerId,
            int planId,
            LocalDate startDate,
            LocalDate expiryDate,
            String status) {

        repository.registerMembership(
                memberId,
                trainerId,
                planId,
                java.sql.Date.valueOf(startDate),
                java.sql.Date.valueOf(expiryDate),
                status
        );
    }

    // MYSQL FUNCTION
    public LocalDate calculateExpiryDate(
            LocalDate startDate,
            int durationMonths) {

        java.sql.Date result =
                repository.calculateExpiryDate(
                        java.sql.Date.valueOf(startDate),
                        durationMonths
                );

        return result.toLocalDate();
    }
}