package com.victoroliveira.messenger.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomPasswordEncoder implements PasswordEncoder {

    private final int STRENGTH = 12;

    public CustomPasswordEncoder() {
    }

    @Override
    public String encode(CharSequence userPassword) {
        return BCrypt.hashpw(userPassword.toString(), BCrypt.gensalt(STRENGTH));
    }

    @Override
    public boolean matches(CharSequence userPassword, String hashedPassword) {
        if (userPassword != null && userPassword.length() != 0) {
            return BCrypt.checkpw(userPassword.toString(), hashedPassword);
        }
        return false;
    }

    @Override
    public boolean upgradeEncoding(String encodedPassword) {
        // no use
        return false;
    }
}
