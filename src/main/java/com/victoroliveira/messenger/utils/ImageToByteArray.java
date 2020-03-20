package com.victoroliveira.messenger.utils;

import com.victoroliveira.messenger.models.Avatar;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import java.io.*;

public class ImageToByteArray {
    public static Avatar defaultAvatar = new Avatar(ImageToByteArray.convert());
    public static byte[] convert() {
        try {
            InputStream pic = new ClassPathResource("./static/img/default.png").getInputStream();
            return StreamUtils.copyToByteArray(pic);
        } catch (IOException e) {
            System.out.println("Exception has occured");
            throw new RuntimeException();
        }
    }

    public static Avatar defaultAvatar() {
        return defaultAvatar;
    }
}
