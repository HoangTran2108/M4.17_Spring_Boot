package com.example.bt.controller;

import com.example.bt.model.Product;
import com.example.bt.service.productService.IProduceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProduceService produceService;

    @GetMapping()
    public ResponseEntity<Iterable<Product>> getAllProduct(){
        return new ResponseEntity<>(produceService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        return new ResponseEntity<>(produceService.save(product), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id){
        Optional<Product>product = produceService.findById(id);
        if(!product.isPresent()){
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        produceService.remove(id);
        return new ResponseEntity<>(product.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable Long id, @RequestBody Product product){
        Optional<Product>products = produceService.findById(id);
        if(!products.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        product.setId(products.get().getId());
        return new ResponseEntity<>(produceService.save(product), HttpStatus.OK);
    }
}
