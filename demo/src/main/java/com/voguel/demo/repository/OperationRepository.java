package com.voguel.demo.repository;

import com.voguel.demo.entities.Compte;
import com.voguel.demo.entities.Operation;
import com.voguel.demo.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OperationRepository extends MongoRepository<Operation, Long>

    {
        List<Operation> findByCodeCompte(String cdCompte);
        Optional<Operation> findByUser(User user);
        List<Operation> findAllByUser(User user);

    }