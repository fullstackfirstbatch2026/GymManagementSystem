package com.example.GymManagement.repository;

import com.example.GymManagement.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;

public interface MembershipRepository extends JpaRepository<Membership, Integer> {

    // STORED PROCEDURE
    @Procedure(procedureName = "register_membership")
    void registerMembership(
            int p_member_id,
            int p_trainer_id,
            int p_plan_id,
            Date p_start_date,
            Date p_expiry_date,
            String p_status
    );

    // MYSQL FUNCTION
    @Query(value = "SELECT calculate_expiry_date(:startDate, :durationMonths)", nativeQuery = true)
    Date calculateExpiryDate(
            @org.springframework.data.repository.query.Param("startDate") Date startDate,
            @org.springframework.data.repository.query.Param("durationMonths") int durationMonths
    );
}