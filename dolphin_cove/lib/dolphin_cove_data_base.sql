CREATE DATABASE  IF NOT EXISTS `dolphin_cove` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dolphin_cove`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: dolphin_cove
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','nicolos','smith','password');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booked_programs`
--

DROP TABLE IF EXISTS `booked_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booked_programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int NOT NULL,
  `program_id` int NOT NULL,
  `tour_company_id` int DEFAULT NULL,
  `date_booked` date NOT NULL,
  `payment` varchar(45) NOT NULL,
  `num_guest` int NOT NULL,
  `total_cost` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `guest_id_idx` (`guest_id`),
  KEY `tour_company_idx` (`tour_company_id`),
  KEY `program_id_idx` (`program_id`),
  CONSTRAINT `guest_id` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`),
  CONSTRAINT `program_id` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`),
  CONSTRAINT `tour_company` FOREIGN KEY (`tour_company_id`) REFERENCES `tour_comps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booked_programs`
--

LOCK TABLES `booked_programs` WRITE;
/*!40000 ALTER TABLE `booked_programs` DISABLE KEYS */;
INSERT INTO `booked_programs` VALUES (1,10,1,3,'2022-10-13','reserved',2,6000),(2,9,1,3,'2022-11-10','reserved',2,6000),(27,9,33,3,'2022-07-07','reserved',9,18000),(28,11,32,1,'2018-06-20','credited',3,15000),(29,9,33,3,'2022-06-29','reserved',2,4000),(30,19,33,2,'2022-06-23','reserved',4,8000),(31,19,33,2,'2022-06-29','reserved',3,6000),(32,19,33,2,'2022-06-29','reserved',3,6000),(33,19,33,2,'2022-06-29','reserved',3,6000),(34,19,33,2,'2022-06-29','reserved',3,6000),(35,21,32,2,'2022-06-13','reserved',4,20000);
/*!40000 ALTER TABLE `booked_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,'Nicolos','Smith','niolos2113@gmail.com',1),(9,'Nicolos','Smith','niolos2113@gmail.com',2),(10,'Niolos','Smith','niolos2113@gmail.com',2),(11,'michael','morgan','morgan@gmail.com',2),(17,'Nicolos','Smith','niolos2113@gmail.com',NULL),(18,'Nicolos','Smith','niolos2113@gmail.com',NULL),(19,'Nicolos','Smith','niolos2113@gmail.com',3),(20,'jack ','smith','jjjjskjb@gmail.com',3),(21,'Cary','Wallace','wallace26@gmail.com',3);
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'riu'),(2,'blue moon'),(3,'n/a');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `p_name` varchar(45) NOT NULL,
  `num_of_guest` int NOT NULL,
  `cost` int NOT NULL,
  `description` longtext NOT NULL,
  `image` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,'Swim ',4,3000,'At Dolphin Cove, interact with one dolphin while swimming in the deep. Enjoy a kiss, try a dance, perhaps you will get a splash or two and have a real up close experience.','swimAdventure.jpg'),(32,'Royal Swim',7,5000,'The most fun and unique program, designed to exceed all your expectations.Feel the thrill of foot-push; The dolphins will rise you above the water surface by pushing you from the soles of your feet.','program-3.jpg'),(33,'Encounter',31,2000,'They will give you a kiss and allow you to caress them while standing in knee deep water. This adventure is best for those who are not comfortable swimming in the sea and the very young.','encounter.jpg');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_comps`
--

DROP TABLE IF EXISTS `tour_comps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_comps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `comp_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_comps`
--

LOCK TABLES `tour_comps` WRITE;
/*!40000 ALTER TABLE `tour_comps` DISABLE KEYS */;
INSERT INTO `tour_comps` VALUES (1,'bT@gmail.com','Blazing Tours','Blazing'),(2,'n/a','n/a','n/a'),(3,'JV@gmail.com','Jus Vybe','mello');
/*!40000 ALTER TABLE `tour_comps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dolphin_cove'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-22  8:40:16
