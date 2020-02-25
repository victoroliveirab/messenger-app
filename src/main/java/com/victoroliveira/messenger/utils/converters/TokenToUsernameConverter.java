package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.security.SecurityConstants;
import io.jsonwebtoken.Jwts;

public class TokenToUsernameConverter {
    public static String convert(String token) {
        return Jwts.parser().setSigningKey(SecurityConstants.TOKEN_SECURITY).parseClaimsJws(token.split(" ")[1]).getBody().getSubject();
    }
}
