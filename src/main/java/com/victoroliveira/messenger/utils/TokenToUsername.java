package com.victoroliveira.messenger.utils;

import com.victoroliveira.messenger.security.SecurityConstants;
import io.jsonwebtoken.Jwts;

public class TokenToUsername {
    public static String convert(String token) {
        return Jwts.parser().setSigningKey(SecurityConstants.TOKEN_SECURITY).parseClaimsJws(token.split(" ")[1]).getBody().getSubject();
    }
}
