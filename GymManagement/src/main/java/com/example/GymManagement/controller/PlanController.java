package com.example.GymManagement.controller;

import com.example.GymManagement.entity.Plan;
import com.example.GymManagement.service.PlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plans")
public class PlanController {

    private final PlanService service;

    public PlanController(PlanService service) {
        this.service = service;
    }

    @PostMapping
    public Plan addPlan(@RequestBody Plan plan) {
        return service.addPlan(plan);
    }

    @GetMapping
    public List<Plan> getAllPlans() {
        return service.getAllPlans();
    }

    @GetMapping("/{id}")
    public Plan getPlanById(@PathVariable int id) {
        return service.getPlanById(id);
    }

    @PutMapping("/{id}")
    public Plan updatePlan(
            @PathVariable int id,
            @RequestBody Plan plan) {
        return service.updatePlan(id, plan);
    }

    @DeleteMapping("/{id}")
    public String deletePlan(@PathVariable int id) {
        return service.deletePlan(id);
    }
}