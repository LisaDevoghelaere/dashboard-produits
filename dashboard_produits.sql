-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 28 juil. 2020 à 07:32
-- Version du serveur :  10.5.4-MariaDB-1:10.5.4+maria~focal
-- Version de PHP : 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dashboard_produits`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(2) NOT NULL,
  `categorie` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `categorie`) VALUES
(1, 'Electromenager'),
(2, 'TV-HIFI'),
(3, 'Bricolage'),
(4, 'Voiture'),
(5, 'Bijoux');

-- --------------------------------------------------------

--
-- Structure de la table `e-commerce`
--

CREATE TABLE `e-commerce` (
  `id_produit` int(4) NOT NULL,
  `url` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id_produit` int(4) NOT NULL,
  `nom_photo` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(4) NOT NULL,
  `nom` varchar(50) COLLATE utf8_bin NOT NULL,
  `reference` int(20) NOT NULL,
  `prix` decimal(5,2) NOT NULL,
  `date_achat` date NOT NULL,
  `date_fin_garantie` date NOT NULL,
  `id_categorie` int(2) NOT NULL,
  `conseil` text COLLATE utf8_bin NOT NULL,
  `manuel_utilisation` text COLLATE utf8_bin NOT NULL,
  `ticket_achat` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `vente_direct`
--

CREATE TABLE `vente_direct` (
  `id_produit` int(4) NOT NULL,
  `ville` varchar(50) COLLATE utf8_bin NOT NULL,
  `code_postal` int(5) NOT NULL,
  `rue` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `e-commerce`
--
ALTER TABLE `e-commerce`
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `photos`
--
ALTER TABLE `photos`
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `vente_direct`
--
ALTER TABLE `vente_direct`
  ADD KEY `id_produit` (`id_produit`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `e-commerce`
--
ALTER TABLE `e-commerce`
  ADD CONSTRAINT `e-commerce_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vente_direct`
--
ALTER TABLE `vente_direct`
  ADD CONSTRAINT `vente_direct_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
