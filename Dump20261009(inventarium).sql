CREATE DATABASE  IF NOT EXISTS `inventario_shb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventario_shb`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: inventario_shb
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
-- Table structure for table `material_manutencao`
--

DROP TABLE IF EXISTS `material_manutencao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_manutencao` (
  `cd_codigo` int NOT NULL AUTO_INCREMENT,
  `nm_item` varchar(60) DEFAULT NULL,
  `ds_tipo` varchar(20) DEFAULT NULL,
  `qt_itens` int DEFAULT NULL,
  `vl_unitario` decimal(10,2) DEFAULT NULL,
  `qt_minima` int DEFAULT '0',
  PRIMARY KEY (`cd_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_manutencao`
--

LOCK TABLES `material_manutencao` WRITE;
/*!40000 ALTER TABLE `material_manutencao` DISABLE KEYS */;
INSERT INTO `material_manutencao` VALUES (1,'Fita Isolante','Elétrico',4,12.00,0),(3,'Lampadas','Elétrico',3,10.00,0),(6,'Resistencia ','Elétrico',1,39.00,0),(7,'Joelho de 3/4','Hidráulico',12,10.00,0),(10,'chave de fenda','Insumos',4,20.00,1),(11,'Mangueira flexivel','Hidráulico',2,20.00,0),(12,'Massa Corrida','Insumos',1,100.00,0),(13,'teste','Elétrico',1,20.00,0);
/*!40000 ALTER TABLE `material_manutencao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimentacao`
--

DROP TABLE IF EXISTS `movimentacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentacao` (
  `cd_movimentacao` int NOT NULL AUTO_INCREMENT,
  `cd_item` int DEFAULT NULL,
  `cd_usuario` int DEFAULT NULL,
  `tp_movimento` enum('entrada','saida') DEFAULT NULL,
  `qt_movimentada` int DEFAULT NULL,
  `dt_movimento` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cd_movimentacao`),
  KEY `cd_item` (`cd_item`),
  KEY `cd_usuario` (`cd_usuario`),
  CONSTRAINT `movimentacao_ibfk_1` FOREIGN KEY (`cd_item`) REFERENCES `material_manutencao` (`cd_codigo`),
  CONSTRAINT `movimentacao_ibfk_2` FOREIGN KEY (`cd_usuario`) REFERENCES `users` (`cd_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentacao`
--

LOCK TABLES `movimentacao` WRITE;
/*!40000 ALTER TABLE `movimentacao` DISABLE KEYS */;
INSERT INTO `movimentacao` VALUES (2,1,1,'saida',2,'2026-08-04 00:00:00'),(3,1,1,'saida',2,'2026-08-08 00:00:00'),(4,1,1,'saida',NULL,'2026-09-26 10:33:09'),(5,1,1,'saida',NULL,'2026-09-26 10:34:42'),(6,1,1,'saida',NULL,'2026-09-26 10:35:10'),(7,3,1,'saida',NULL,'2026-09-26 10:35:42'),(8,1,1,'saida',NULL,'2026-09-26 10:38:28'),(9,1,1,'saida',NULL,'2026-09-26 10:39:45'),(10,3,1,'saida',NULL,'2026-09-26 10:39:51'),(11,1,1,'saida',NULL,'2026-09-26 10:41:16'),(12,3,1,'saida',NULL,'2026-09-26 10:41:26'),(13,1,1,'saida',2,'2026-09-26 10:43:20'),(14,3,1,'saida',NULL,'2026-09-26 11:36:44'),(15,1,1,'saida',NULL,'2026-09-26 11:38:02'),(16,1,1,'saida',NULL,'2026-09-26 11:38:52'),(17,3,1,'saida',NULL,'2026-09-26 11:38:56'),(18,1,1,'saida',1,'2026-09-26 11:40:14'),(19,1,1,'saida',2,'2026-09-26 11:42:12'),(20,1,1,'entrada',2,'2026-09-26 11:42:17'),(21,11,1,'entrada',2,'2026-09-26 11:46:28'),(22,12,1,'entrada',1,'2026-09-28 11:35:18'),(23,13,1,'entrada',1,'2026-09-28 11:35:35');
/*!40000 ALTER TABLE `movimentacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `cd_usuario` int NOT NULL AUTO_INCREMENT,
  `nm_usuario` varchar(60) DEFAULT NULL,
  `ds_login` varchar(30) DEFAULT NULL,
  `ds_senha` varchar(255) DEFAULT NULL,
  `ds_google_id` varchar(255) DEFAULT NULL,
  `tp_usuario` enum('gestao','comum') NOT NULL DEFAULT 'comum',
  `ds_email` varchar(255) NOT NULL,
  PRIMARY KEY (`cd_usuario`),
  UNIQUE KEY `ds_login` (`ds_login`),
  UNIQUE KEY `ds_google_id` (`ds_google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Israel admin','admin_silas','$2y$10$zRgnluY5bfdnj7bxzSdSnOs5bjeYHclSmpokCwBSmv6UJbuaIOuSy',NULL,'gestao',''),(2,'usuario','user_test','$2y$10$xHBH4gHQZ7ZTyyMaIMYtr.4r1xYTv4xHqnU1vfBEYwp2pnrWEkzn.',NULL,'comum',''),(3,'teste da Silva','teste_silva','$2y$10$WevKFF39qIzawkGEIwiSb.IVfrTizcnG0tV7vEg4MDGPTM9Mw4dru',NULL,'comum','teste@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-09 10:13:28
