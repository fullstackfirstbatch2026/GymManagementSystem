package com.example.GymManagement.service;

import com.example.GymManagement.entity.Plan;
import com.example.GymManagement.repository.PlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private final PlanRepository repository;

    public PlanService(PlanRepository repository) {
        this.repository = repository;
    }

    public Plan addPlan(Plan plan) {
        return repository.save(plan);
    }

    public List<Plan> getAllPlans() {
        return repository.findAll();
    }

    public Plan getPlanById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Plan updatePlan(int id, Plan plan) {

        Plan existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setPlanName(plan.getPlanName());
            existing.setDurationMonths(plan.getDurationMonths());
            existing.setPrice(plan.getPrice());

            return repository.save(existing);
        }

        return null;
    }

    public String deletePlan(int id) {
        repository.deleteById(id);
        return "Plan deleted successfully";
    }
}