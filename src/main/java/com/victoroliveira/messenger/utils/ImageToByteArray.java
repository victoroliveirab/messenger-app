package com.victoroliveira.messenger.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import java.io.*;

public class ImageToByteArray {
    public static byte[] convert() {
        try {
            InputStream pic = new ClassPathResource("./static/img/default.png").getInputStream();
            return StreamUtils.copyToByteArray(pic);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }
}
