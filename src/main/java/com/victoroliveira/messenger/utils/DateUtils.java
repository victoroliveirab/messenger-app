package com.victoroliveira.messenger.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class DateUtils {
    private final static SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

//    public static boolean isValid(LocalDate date) {
//        System.out.println("Method called");
//        if (date == null) return false;
//        dateFormat.setLenient(false);
//        try {
//            dateFormat.parse(date.toString());
//        } catch (ParseException e) {
//            return false;
//        }
//        return true;
//    }

    public static boolean over18(LocalDate date) {
        return ChronoUnit.YEARS.between(date, LocalDate.now()) >= 18 ;
    }
}
