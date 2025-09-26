-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.8.3-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour la_brute
CREATE DATABASE IF NOT EXISTS `la_brute` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `la_brute`;

-- Listage de la structure de la table la_brute. arme
CREATE TABLE IF NOT EXISTS `arme` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `puissance` tinyint(4) DEFAULT 0,
  `esquive` tinyint(4) DEFAULT 0,
  `robot_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_arme_robot` (`robot_id`),
  CONSTRAINT `FK_arme_robot` FOREIGN KEY (`robot_id`) REFERENCES `robot` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table la_brute.arme : ~2 rows (environ)
/*!40000 ALTER TABLE `arme` DISABLE KEYS */;
INSERT IGNORE INTO `arme` (`id`, `nom`, `image`, `puissance`, `esquive`, `robot_id`) VALUES
	(6, 'Dark Excalibur', '/images/dark-excalibur.png', 20, 0, 1),
	(7, 'Excalibur', '/images/excalibur.png', 15, 5, 1);
/*!40000 ALTER TABLE `arme` ENABLE KEYS */;

-- Listage de la structure de la table la_brute. bouclier
CREATE TABLE IF NOT EXISTS `bouclier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `defense` tinyint(4) DEFAULT 0,
  `esquive` tinyint(4) DEFAULT 0,
  `robot_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `robot_id` (`robot_id`),
  CONSTRAINT `robot_id` FOREIGN KEY (`robot_id`) REFERENCES `robot` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table la_brute.bouclier : ~2 rows (environ)
/*!40000 ALTER TABLE `bouclier` DISABLE KEYS */;
INSERT IGNORE INTO `bouclier` (`id`, `nom`, `image`, `defense`, `esquive`, `robot_id`) VALUES
	(4, 'Dark Bouclier Hylia', '/images/hylian-shield-dark.png', 20, 0, 1),
	(5, 'Bouclier Hylia', '/images/bouclier-hylien.png', 15, 5, 1);
/*!40000 ALTER TABLE `bouclier` ENABLE KEYS */;

-- Listage de la structure de la table la_brute. robot
CREATE TABLE IF NOT EXISTS `robot` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) NOT NULL DEFAULT 'robot',
  `puissance` tinyint(4) NOT NULL DEFAULT 0,
  `esquive` tinyint(4) NOT NULL DEFAULT 0,
  `defense` tinyint(4) NOT NULL DEFAULT 0,
  `pv` smallint(6) NOT NULL DEFAULT 0,
  `niveau` tinyint(4) NOT NULL DEFAULT 1,
  `experience` bigint(20) NOT NULL DEFAULT 0,
  `argent` int(11) NOT NULL DEFAULT 0,
  `arme_id` bigint(20) DEFAULT NULL,
  `bouclier_id` bigint(20) DEFAULT NULL,
  `tenue_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `robot_tenue_id` (`tenue_id`),
  KEY `robot_bouclier_id` (`bouclier_id`),
  KEY `robot_arme_id` (`arme_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `robot_arme_id` FOREIGN KEY (`arme_id`) REFERENCES `arme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `robot_bouclier_id` FOREIGN KEY (`bouclier_id`) REFERENCES `bouclier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `robot_tenue_id` FOREIGN KEY (`tenue_id`) REFERENCES `tenue` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table la_brute.robot : ~2 rows (environ)
/*!40000 ALTER TABLE `robot` DISABLE KEYS */;
INSERT IGNORE INTO `robot` (`id`, `pseudo`, `puissance`, `esquive`, `defense`, `pv`, `niveau`, `experience`, `argent`, `arme_id`, `bouclier_id`, `tenue_id`, `user_id`) VALUES
	(1, 'astro', 30, 15, 30, 100, 1, 0, 0, NULL, NULL, NULL, 1);
/*!40000 ALTER TABLE `robot` ENABLE KEYS */;

-- Listage de la structure de la table la_brute. tenue
CREATE TABLE IF NOT EXISTS `tenue` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `pv` tinyint(4) DEFAULT 0,
  `puissance` tinyint(4) DEFAULT 0,
  `defense` tinyint(4) DEFAULT 0,
  `robot_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `robot-id` (`robot_id`),
  CONSTRAINT `robot-id` FOREIGN KEY (`robot_id`) REFERENCES `robot` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table la_brute.tenue : ~2 rows (environ)
/*!40000 ALTER TABLE `tenue` DISABLE KEYS */;
INSERT IGNORE INTO `tenue` (`id`, `nom`, `image`, `pv`, `puissance`, `defense`, `robot_id`) VALUES
	(3, 'Arthuria Armor', '/images/armor.png', 10, 15, 5, 1),
	(4, 'Arthuria Alter Armor', '/images/magic-armor.png', 5, 20, 5, 1);
/*!40000 ALTER TABLE `tenue` ENABLE KEYS */;

-- Listage de la structure de la table la_brute. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table la_brute.user : ~4 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`id`, `pseudo`, `login`, `password`) VALUES
	(1, 'Admin', 'admin', 'admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
