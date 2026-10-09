package com.example.GymManagement.service;

import com.example.GymManagement.entity.Member;
import com.example.GymManagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public Member addMember(Member member) {
        return repository.save(member);
    }

    public List<Member> getAllMembers() {
        return repository.findAll();
    }

    public Member getMemberById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Member updateMember(int id, Member member) {

        Member existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setMemberName(member.getMemberName());
            existing.setEmail(member.getEmail());
            existing.setPhone(member.getPhone());
            existing.setAge(member.getAge());
            existing.setGender(member.getGender());

            return repository.save(existing);
        }

        return null;
    }

    public String deleteMember(int id) {
        repository.deleteById(id);
        return "Member deleted successfully";
    }
}