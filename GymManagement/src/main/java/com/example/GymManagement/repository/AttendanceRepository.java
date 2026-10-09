package com.example.GymManagement.repository;

import com.example.GymManagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    // JOIN
    @Query(value = """
            SELECT
                m.member_id,
                m.member_name,
                a.attendance_date,
                a.status,
                ms.start_date,
                ms.expiry_date
            FROM members m
            JOIN attendance a
                ON m.member_id = a.member_id
            JOIN memberships ms
                ON m.member_id = ms.member_id
            """, nativeQuery = true)
    List<Object[]> getMemberAttendanceMembership();


    // SUBQUERY
    @Query(value = """
            SELECT
                m.member_id,
                m.member_name,
                COUNT(a.attendance_id) AS attendance_count
            FROM members m
            JOIN attendance a
                ON m.member_id = a.member_id
            WHERE a.status = 'Present'
            GROUP BY m.member_id, m.member_name
            HAVING COUNT(a.attendance_id) > (
                SELECT AVG(attendance_count)
                FROM (
                    SELECT COUNT(attendance_id) AS attendance_count
                    FROM attendance
                    WHERE status = 'Present'
                    GROUP BY member_id
                ) AS attendance_summary
            )
            """, nativeQuery = true)
    List<Object[]> getMembersAboveAverageAttendance();
}