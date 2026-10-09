package com.example.GymManagement.controller;

import com.example.GymManagement.entity.Trainer;
import com.example.GymManagement.service.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    @PostMapping
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return service.addTrainer(trainer);
    }

    @GetMapping
    public List<Trainer> getAllTrainers() {
        return service.getAllTrainers();
    }

    @GetMapping("/{id}")
    public Trainer getTrainerById(@PathVariable int id) {
        return service.getTrainerById(id);
    }

    @PutMapping("/{id}")
    public Trainer updateTrainer(
            @PathVariable int id,
            @RequestBody Trainer trainer) {
        return service.updateTrainer(id, trainer);
    }

    @DeleteMapping("/{id}")
    public String deleteTrainer(@PathVariable int id) {
        return service.deleteTrainer(id);
    }
}