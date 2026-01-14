-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema E-Commerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema E-Commerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `E-Commerce` DEFAULT CHARACTER SET utf8 ;
USE `E-Commerce` ;

-- -----------------------------------------------------
-- Table `E-Commerce`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` TEXT NOT NULL,
  `last_name` TEXT NOT NULL,
  `country` VARCHAR(45) NULL,
  `disctric` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `addree_line1` VARCHAR(255) NULL,
  `address_line2` VARCHAR(255) NULL,
  `postal_code` INT NULL,
  `mobile_no_1` VARCHAR(13) NOT NULL,
  `mobile_no_2` VARCHAR(13) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `satus` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `category_img_1` TEXT NOT NULL,
  `category_img_2` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`super_admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`super_admin` (
  `super_admin_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` TEXT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `super_admin_name` TEXT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`super_admin_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`product` (
  `product_id` VARCHAR(45) NOT NULL,
  `product_code` VARCHAR(45) NULL,
  `product_name` TEXT NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `product_colors` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_product_category1_idx` (`category_id` ASC) VISIBLE,
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `E-Commerce`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`product_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`product_images` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT(1) NOT NULL,
  `image` TEXT NOT NULL,
  `is_primary` TINYINT NOT NULL,
  `product_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`image_id`),
  INDEX `fk_product_images_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_images_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `E-Commerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`seller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`seller` (
  `seller_id` VARCHAR(45) NOT NULL,
  `seller_name` TEXT NOT NULL,
  `address` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `mobile_no` VARCHAR(20) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL,
  `super_admin_id` INT NOT NULL,
  PRIMARY KEY (`seller_id`),
  INDEX `fk_seller_super_admin1_idx` (`super_admin_id` ASC) VISIBLE,
  UNIQUE INDEX `seller_id_UNIQUE` (`seller_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_seller_super_admin1`
    FOREIGN KEY (`super_admin_id`)
    REFERENCES `E-Commerce`.`super_admin` (`super_admin_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`delivery` (
  `shipping_id` VARCHAR(45) NOT NULL,
  `tracking_no` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `upaded_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`shipping_id`),
  UNIQUE INDEX `shipping_id_UNIQUE` (`shipping_id` ASC) VISIBLE,
  UNIQUE INDEX `tracking_no_UNIQUE` (`tracking_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`order` (
  `order_id` VARCHAR(45) NOT NULL,
  `product_id` VARCHAR(45) NOT NULL,
  `shipping_id` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `qty` INT NOT NULL,
  `discount_type` VARCHAR(45) NOT NULL,
  `discount` DOUBLE NULL,
  `total_amount` DOUBLE NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `distric` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `address_line_1` VARCHAR(100) NOT NULL,
  `address_line_2` VARCHAR(100) NOT NULL,
  `postal_code` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_product_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_product_has_user_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_order_delivery1_idx` (`shipping_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_user_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `E-Commerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `E-Commerce`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_delivery1`
    FOREIGN KEY (`shipping_id`)
    REFERENCES `E-Commerce`.`delivery` (`shipping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`supplier` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` VARCHAR(45) NOT NULL,
  `supplier_name` TEXT NOT NULL,
  `address` VARCHAR(100) NULL,
  `tel_no` VARCHAR(13) NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`supplier_id`),
  INDEX `fk_supplier_seller1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_supplier_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `E-Commerce`.`seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`grn`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`grn` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `supplier_id` INT NOT NULL,
  `product_id` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `qty` INT NOT NULL,
  `cost_price` DOUBLE NOT NULL,
  `sell_price` DOUBLE NOT NULL,
  `total` DOUBLE NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  INDEX `fk_supplier_has_product_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_supplier_has_product_supplier1_idx` (`supplier_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_supplier_has_product_supplier1`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `E-Commerce`.`supplier` (`supplier_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_supplier_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `E-Commerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` VARCHAR(45) NOT NULL,
  `grn_id` INT NOT NULL,
  `qty` INT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  INDEX `fk_product_has_seller_seller1_idx` (`seller_id` ASC) VISIBLE,
  PRIMARY KEY (`id`, `grn_id`),
  INDEX `fk_stock_grn1_idx` (`grn_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_seller_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `E-Commerce`.`seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_grn1`
    FOREIGN KEY (`grn_id`)
    REFERENCES `E-Commerce`.`grn` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `qty` INT NOT NULL,
  `total_amount` DOUBLE NOT NULL,
  PRIMARY KEY (`cart_id`, `product_id`, `user_id`),
  INDEX `fk_cart_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_cart_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `E-Commerce`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `E-Commerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`order_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` VARCHAR(45) NOT NULL,
  `order_item` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_item_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_item_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `E-Commerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`product_discount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`product_discount` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(45) NOT NULL,
  `discount_type` VARCHAR(45) NOT NULL,
  `discount_amount` DOUBLE NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_discount_product1_idx` (`product_id` ASC) VISIBLE,
  UNIQUE INDEX `discount_amount_UNIQUE` (`discount_amount` ASC) VISIBLE,
  CONSTRAINT `fk_product_discount_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `E-Commerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`payment` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `payment_method` VARCHAR(45) NOT NULL,
  `transaction_id` VARCHAR(45) NULL,
  `order_id` VARCHAR(45) NOT NULL,
  `amout` DOUBLE NOT NULL,
  `status` TINYINT(2) NULL DEFAULT 2,
  `crated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`payment_id`, `order_id`),
  UNIQUE INDEX `transaction_id_UNIQUE` (`transaction_id` ASC) VISIBLE,
  INDEX `fk_payment_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `E-Commerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`return`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`return` (
  `return_id` VARCHAR(45) NOT NULL,
  `status` TINYINT(0) NULL DEFAULT 0,
  `payment_id` INT NOT NULL,
  `shipping_id` VARCHAR(45) NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `evidence_img` VARCHAR(255) NULL,
  `order_id` VARCHAR(45) NOT NULL,
  `qty` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`return_id`, `shipping_id`),
  UNIQUE INDEX `return_id_UNIQUE` (`return_id` ASC) VISIBLE,
  INDEX `fk_return_delivery1_idx` (`shipping_id` ASC, `payment_id` ASC, `order_id` ASC) VISIBLE,
  CONSTRAINT `fk_return_delivery1`
    FOREIGN KEY (`shipping_id`)
    REFERENCES `E-Commerce`.`delivery` (`shipping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																															';


-- -----------------------------------------------------
-- Table `E-Commerce`.`refund`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`refund` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shipping_id` VARCHAR(45) NOT NULL,
  `return_id` VARCHAR(45) NOT NULL,
  `refund_amount` DOUBLE NOT NULL,
  `status` TINYINT(0) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`, `shipping_id`, `return_id`),
  INDEX `fk_refund_return1_idx` (`return_id` ASC, `shipping_id` ASC) VISIBLE,
  CONSTRAINT `fk_refund_return1`
    FOREIGN KEY (`return_id` , `shipping_id`)
    REFERENCES `E-Commerce`.`return` (`return_id` , `shipping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`admin_remark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`admin_remark` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shipping_id` VARCHAR(45) NOT NULL,
  `super_admin_id` INT NOT NULL,
  `return_id` VARCHAR(45) NOT NULL,
  `reson` VARCHAR(255) NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `status` TINYINT(0) NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_remark_return1_idx` (`return_id` ASC, `shipping_id` ASC) VISIBLE,
  INDEX `fk_admin_remark_super_admin1_idx` (`super_admin_id` ASC) VISIBLE,
  CONSTRAINT `fk_admin_remark_return1`
    FOREIGN KEY (`return_id` , `shipping_id`)
    REFERENCES `E-Commerce`.`return` (`return_id` , `shipping_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_admin_remark_super_admin1`
    FOREIGN KEY (`super_admin_id`)
    REFERENCES `E-Commerce`.`super_admin` (`super_admin_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`order_return`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`order_return` (
  `return_order_id` VARCHAR(45) NOT NULL,
  `remark_id` INT NOT NULL,
  `return_id` VARCHAR(45) NOT NULL,
  `refund_id` INT NOT NULL,
  `shipping_id` VARCHAR(45) NOT NULL,
  `payment_id` INT NOT NULL,
  `payment_order_id` VARCHAR(45) NOT NULL,
  `status` TINYINT(0) NULL DEFAULT 0,
  `total_amount` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`return_order_id`),
  INDEX `fk_order_return_admin_remark1_idx` (`remark_id` ASC) VISIBLE,
  INDEX `fk_order_return_refund1_idx` (`refund_id` ASC, `shipping_id` ASC, `return_id` ASC) VISIBLE,
  INDEX `fk_order_return_payment1_idx` (`payment_id` ASC, `payment_order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_return_admin_remark1`
    FOREIGN KEY (`remark_id`)
    REFERENCES `E-Commerce`.`admin_remark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_return_refund1`
    FOREIGN KEY (`refund_id` , `shipping_id` , `return_id`)
    REFERENCES `E-Commerce`.`refund` (`id` , `shipping_id` , `return_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_return_payment1`
    FOREIGN KEY (`payment_id` , `payment_order_id`)
    REFERENCES `E-Commerce`.`payment` (`payment_id` , `order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`seller_orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`seller_orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` VARCHAR(45) NOT NULL,
  `seller_id` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  INDEX `fk_order_has_seller_seller1_idx` (`seller_id` ASC) VISIBLE,
  INDEX `fk_order_has_seller_order1_idx` (`order_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_has_seller_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `E-Commerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_seller_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `E-Commerce`.`seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `super_admin_id` INT NOT NULL,
  `order_id` VARCHAR(45) NOT NULL,
  `return_order_id` VARCHAR(45) NOT NULL,
  `feedback` VARCHAR(45) NOT NULL,
  `rating` INT NOT NULL,
  `preview_img` VARCHAR(45) NULL,
  `status` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_super_admin1_idx` (`super_admin_id` ASC) VISIBLE,
  INDEX `fk_feedback_order1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_feedback_order_return1_idx` (`return_order_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_super_admin1`
    FOREIGN KEY (`super_admin_id`)
    REFERENCES `E-Commerce`.`super_admin` (`super_admin_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `E-Commerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_order_return1`
    FOREIGN KEY (`return_order_id`)
    REFERENCES `E-Commerce`.`order_return` (`return_order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `E-Commerce`.`seller_has_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `E-Commerce`.`seller_has_role` (
  `id` INT NOT NULL,
  `seller_id` VARCHAR(45) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_seller_has_role_role1_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_seller_has_role_seller1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_seller_has_role_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `E-Commerce`.`seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_seller_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `E-Commerce`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
