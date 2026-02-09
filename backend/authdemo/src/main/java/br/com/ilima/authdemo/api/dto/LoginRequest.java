package br.com.ilima.authdemo.api.dto;

public record LoginRequest(
        String username,
        String password
) {}
