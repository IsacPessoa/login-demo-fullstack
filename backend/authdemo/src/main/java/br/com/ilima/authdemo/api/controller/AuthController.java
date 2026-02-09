package br.com.ilima.authdemo.api.controller;

import br.com.ilima.authdemo.api.dto.LoginRequest;
import br.com.ilima.authdemo.api.dto.RegisterRequest;
import br.com.ilima.authdemo.domain.entity.User;
import br.com.ilima.authdemo.domain.repository.UserRepository;
import br.com.ilima.authdemo.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(UserRepository repository, PasswordEncoder encoder, JwtService jwtService) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest dto) {
        if (repository.existsByUsername(dto.username())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = User.builder()
                .username(dto.username())
                .password(encoder.encode(dto.password()))
                .role(dto.role())
                .build();

        repository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {

        var userOpt = repository.findByUsername(dto.username());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        var userEntity = userOpt.get();

        if (!encoder.matches(dto.password(), userEntity.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        var userDetails = org.springframework.security.core.userdetails.User
                .withUsername(userEntity.getUsername())
                .password(userEntity.getPassword())
                .roles(userEntity.getRole())
                .build();

        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(
                new br.com.ilima.authdemo.api.dto.AuthResponse(token, userEntity.getUsername(), userEntity.getRole())
        );
    }


}
