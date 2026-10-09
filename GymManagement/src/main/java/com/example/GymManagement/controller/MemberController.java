package com.example.GymManagement.controller;

import com.example.GymManagement.entity.Member;
import com.example.GymManagement.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return service.addMember(member);
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return service.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable int id) {
        return service.getMemberById(id);
    }

    @PutMapping("/{id}")
    public Member updateMember(
            @PathVariable int id,
            @RequestBody Member member) {
        return service.updateMember(id, member);
    }

    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable int id) {
        return service.deleteMember(id);
    }
}