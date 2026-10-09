package com.example.GymManagement.service;

import com.example.GymManagement.entity.Trainer;
import com.example.GymManagement.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository repository;

    public TrainerService(TrainerRepository repository) {
        this.repository = repository;
    }

    public Trainer addTrainer(Trainer trainer) {
        return repository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return repository.findAll();
    }

    public Trainer getTrainerById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Trainer updateTrainer(int id, Trainer trainer) {

        Trainer existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setTrainerName(trainer.getTrainerName());
            existing.setSpecialization(trainer.getSpecialization());
            existing.setPhone(trainer.getPhone());

            return repository.save(existing);
        }

        return null;
    }

    public String deleteTrainer(int id) {
        repository.deleteById(id);
        return "Trainer deleted successfully";
    }
}