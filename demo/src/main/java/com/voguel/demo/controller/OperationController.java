package com.voguel.demo.controller;

import com.voguel.demo.entities.*;
import com.voguel.demo.model.OperationRequest;
import com.voguel.demo.repository.CompteRepository;
import com.voguel.demo.repository.OperationRepository;
import com.voguel.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Operation")
@CrossOrigin("*")
public class OperationController {
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompteRepository compteRepository;

    /*@PostMapping("/addCompteBancaire")
    void addCompteBancaire(@RequestBody CompteBancaire operation) throws IOException {
            addedCompteBancaire = compteBancaireRepository.save(operation);
    }*/
//Do tran by user
    @PostMapping("/addOperation/{mail}")
    void addOperation(@PathVariable(value = "mail") String mail,
                      @RequestBody Operation operation) throws IOException {

        User user = userRepository.findByMail(mail).get(0);

        operation.setUser(user);
        operation.setDateTran(new Date());
        operationRepository.save(operation);

    }


    /*@GetMapping("getCompteBancaireByID/{numCompte}")
    public CompteBancaire getCompteBancaireBynumCompte(@PathVariable(name = "numCompte") long numCompte) {
        CompteBancaire compteBancaire = compteBancaireRepository.findBynumCompte(numCompte).get();
        return compteBancaire;
    }*/

  /*  @GetMapping("getUserByMail/{mail}")
    public Operation getCompteBancaireByByMail(@PathVariable(name = "mail") String mail) {
        User user = userRepository.findByMail(mail).get(0);
        Operation operation = operationRepository.findByUser(user).get();
        return operation ;
    }*/

    // find all transaction by user
    @GetMapping("/getOperations/{mail}")
    public List<Operation> getOperations(@PathVariable(name = "mail") String mail) {
        User user = userRepository.findByMail(mail).get(0);
        List<Operation> operations = new ArrayList<>();
        operations = operationRepository.findAllByUser(user);
        return operations;
    }

    @GetMapping("/getOperationsByCodeCompte/{codeCompte}")
    public List<Operation> getOperationsByCodeCompte(@PathVariable(name = "codeCompte") String codeCompte) {
        List<Operation> operations = operationRepository.findByCodeCompte(codeCompte);
        return operations;
    }
    //SAve opp
    @RequestMapping(value = "/saveOperation", method = RequestMethod.POST)
    public void saveOperation(@RequestBody OperationRequest operationRequest) {

        String typeOperation = operationRequest.getTypeOperation();
        String codeCompte1 = operationRequest.getCodeCompte1();
        double montant = operationRequest.getMontant();
        String codeCompte2 = operationRequest.getCodeCompte2();
        if (typeOperation.equals("DEPOT")) {
            depot(codeCompte1, montant);
        } else if (typeOperation.equals("RETRAIT")) {
            retrait(codeCompte1, montant);
        }
        if (typeOperation.equals("VIREMENT")) {
            virement(codeCompte1, codeCompte2, montant);
        }

    }


    public Compte getCompte(String codeCpte) {
        List<Compte> cpts = compteRepository.findByCodeCompte(codeCpte);
        return cpts.get(cpts.size()-1);
    }

    public void depot(String codeCpte, double montant) {
        Compte cp = getCompte(codeCpte);
        Depot d = new Depot(new Date(), montant, cp);
        Operation op = operationRepository.save(d);
        cp.setSolde(cp.getSolde() + montant);
        cp.getOperations().add(op);
        compteRepository.save(cp);

    }

    public void retrait(String codeCpte, double montant) {
        Compte cp = getCompte(codeCpte);
        Retrait r = new Retrait(new Date(), montant, cp);
        Operation op = operationRepository.save(r);
        cp.setSolde(cp.getSolde() - montant);
        cp.getOperations().add(op);
        compteRepository.save(cp);

    }

    public void virement(String codeCpte1, String codeCpte2, double montant) {
        retrait(codeCpte1, montant);
        depot(codeCpte2, montant);

    }

}
