package br.com.ilima.authdemo.api.dto;

public record AuthResponse(
        String token,
        String username,
        String role
) {}
