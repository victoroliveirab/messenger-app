package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.AvatarDto;
import com.victoroliveira.messenger.utils.ImageToByteArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.DatatypeConverter;
import java.util.Base64;

@RestController
public class AvatarController {

    @GetMapping("/avatar/{username}")
    public String getAvatar(@RequestHeader(name = "Authorization") String token, @PathVariable String username) {
        System.out.println("Retrieving image from username = " + username);
        byte[] img = ImageToByteArray.convert();

        return DatatypeConverter.printBase64Binary(img);
    }
}
