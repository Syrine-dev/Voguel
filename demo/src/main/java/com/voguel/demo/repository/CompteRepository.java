package com.voguel.demo.repository;

import com.voguel.demo.entities.Compte;
import com.voguel.demo.entities.Operation;
import com.voguel.demo.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CompteRepository extends MongoRepository<Compte, Long> {
    List<Compte> findByCodeCompte(String codeCompte);

    List<Compte> findByUser(User user);

}
