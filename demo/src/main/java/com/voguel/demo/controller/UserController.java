package com.voguel.demo.controller;

import com.voguel.demo.entities.Compte;
import com.voguel.demo.entities.User;
import com.voguel.demo.repository.CompteRepository;
import com.voguel.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/User")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompteRepository compteRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        users = userRepository.findAll();
        return users;
    }

    @PostMapping("/addUser")
    void addUser(@RequestBody User user) throws IOException {
        List<User> users = userRepository.findByMail(user.getMail());

        if (users.size() == 0) {

            String compteCode = user.getTel() + generateCodeCompte();
            Compte compte = new Compte(compteCode, new Date(), 0, null, new ArrayList<>());
//            Compte addedCompte = compteRepository.save(compte);
            compte.setUser(user);
            user.setCodeCompte(compteCode);
            User addedUser = userRepository.save(user);
            compte.setUser(addedUser);
            compteRepository.save(compte);

        }

    }

    public String generateCodeCompte() {

        Random rand = new Random();
        String card = "BE";
        for (int i = 0; i < 14; i++) {
            int n = rand.nextInt(10) + 0;
            card += Integer.toString(n);
        }
        return card;
    }


    @GetMapping("getUserByMail/{mail}")
    public User getCandidatUserByID(@PathVariable(name = "mail") String mail) {
        User user = userRepository.findByMail(mail).get(0);
        return user;
    }

    @PutMapping(("/updateSoldeUser/{mail}"))
    public User UpdateSolde(@PathVariable(name = "mail") String mail, @RequestBody User user) {
        User oldUser = userRepository.findByMail(mail).get(0);
        oldUser.setSolde(user.getSolde()); //update soldeTot
        return userRepository.save(oldUser);
    }
}
