package com.voguel.demo.repository;

import com.voguel.demo.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    List<User> findByNom(String nom);

    Optional<User> findById(Long  id);
    List<User> findByMail(String mail);
    @RestResource(path = "/bynom")
    public List<User> findByNomContains(@Param("mc") String nom);
}
