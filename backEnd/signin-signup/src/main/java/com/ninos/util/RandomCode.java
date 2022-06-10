package com.ninos.util;

import org.apache.commons.lang3.RandomStringUtils;

public class RandomCode {

  public static String generateCode(){
    return RandomStringUtils.randomAlphanumeric(5).toUpperCase();
  }

}
