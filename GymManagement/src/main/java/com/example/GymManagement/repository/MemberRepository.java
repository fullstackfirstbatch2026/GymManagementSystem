package com.example.GymManagement.repository;

import com.example.GymManagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}