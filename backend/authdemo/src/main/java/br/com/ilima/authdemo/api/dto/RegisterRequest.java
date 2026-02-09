package br.com.ilima.authdemo.api.dto;

public record RegisterRequest(
        String username,
        String password,
        String role
) {}
