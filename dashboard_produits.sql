-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 30 juil. 2020 à 14:40
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
  `categorie` varchar(30) COLLATE utf8_bin DEFAULT NULL
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
-- Structure de la table `ecommerce`
--

CREATE TABLE `ecommerce` (
  `id_lieu_achat` int(2) NOT NULL,
  `id_produit` int(4) DEFAULT NULL,
  `url` varchar(500) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `ecommerce`
--

INSERT INTO `ecommerce` (`id_lieu_achat`, `id_produit`, `url`) VALUES
(1, 1, 'www.mescouillesenski.fr'),
(1, 5, 'www.enskimescouilles.fr');

-- --------------------------------------------------------

--
-- Structure de la table `lieu_achat`
--

CREATE TABLE `lieu_achat` (
  `id` int(2) NOT NULL,
  `lieud_achat` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `lieu_achat`
--

INSERT INTO `lieu_achat` (`id`, `lieud_achat`) VALUES
(1, 'ecommerce'),
(2, 'vente_direct');

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id_produit` int(4) DEFAULT NULL,
  `nom_photo` varchar(500) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `photos`
--

INSERT INTO `photos` (`id_produit`, `nom_photo`) VALUES
(1, 'esvzvihezf.png'),
(2, 'eiufgeziuezhez.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(4) NOT NULL,
  `nom` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `reference` int(20) DEFAULT NULL,
  `prix` decimal(5,2) DEFAULT NULL,
  `date_achat` date DEFAULT NULL,
  `date_fin_garantie` date DEFAULT NULL,
  `id_categorie` int(2) DEFAULT NULL,
  `conseil` text COLLATE utf8_bin DEFAULT NULL,
  `manuel_utilisation` text COLLATE utf8_bin DEFAULT NULL,
  `ticket_achat` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `id_lieu_achat` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `reference`, `prix`, `date_achat`, `date_fin_garantie`, `id_categorie`, `conseil`, `manuel_utilisation`, `ticket_achat`, `id_lieu_achat`) VALUES
(1, 'ordinateur', 3662466, '299.99', '2020-07-27', '2021-03-30', 2, 'test', 'Appuyer sur \"POWER\" pour allumer', '', 1),
(2, 'Lancia', 6990807, '500.00', '2019-04-14', '2020-07-31', 4, 'Mettre les clé dans le trou pour démarrer', '', '', 2),
(3, 'Lava-vaisselle', 35666743, '100.00', '2018-08-12', '2020-01-13', 1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, provident et perferendis debitis neque voluptatibus culpa earum vel dignissimos, distinctio iusto laudantium maxime aliquid vero aliquam officia? Aperiam, debitis alias.\r\n', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, provident et perferendis debitis neque voluptatibus culpa earum vel dignissimos, distinctio iusto laudantium maxime aliquid vero aliquam officia? Aperiam, debitis alias.\r\n', '', 2),
(4, 'Collier', 23543632, '199.99', '2020-07-21', '2020-09-21', 5, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, provident et perferendis debitis neque voluptatibus culpa earum vel dignissimos, distinctio iusto laudantium maxime aliquid vero aliquam officia? Aperiam, debitis alias.\r\n', '', '', 2),
(5, 'Marteau', 697956, '5.00', '2020-05-11', '2020-09-25', 3, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, provident et perferendis debitis neque voluptatibus culpa earum vel dignissimos, distinctio iusto laudantium maxime aliquid vero aliquam officia? Aperiam, debitis alias.\r\n', '', '', 1),
(6, 'TV', 23253253, '299.99', '2020-07-03', '2020-08-03', 1, '', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, provident et perferendis debitis neque voluptatibus culpa earum vel dignissimos, distinctio iusto laudantium maxime aliquid vero aliquam officia? Aperiam, debitis alias.\r\n', '', 2);

-- --------------------------------------------------------

--
-- Structure de la table `vente_direct`
--

CREATE TABLE `vente_direct` (
  `id_lieu_achat` int(2) NOT NULL,
  `id_produit` int(4) DEFAULT NULL,
  `ville` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `code_postal` int(5) DEFAULT NULL,
  `rue` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `vente_direct`
--

INSERT INTO `vente_direct` (`id_lieu_achat`, `id_produit`, `ville`, `code_postal`, `rue`) VALUES
(2, 2, 'besançon', 25000, '18 rue du margarin'),
(2, 3, 'paris', 75000, '20 rue de l\'impasse');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ecommerce`
--
ALTER TABLE `ecommerce`
  ADD KEY `id_lieu_achat` (`id_lieu_achat`);

--
-- Index pour la table `lieu_achat`
--
ALTER TABLE `lieu_achat`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `id_lieu_achat` (`id_lieu_achat`);

--
-- Index pour la table `vente_direct`
--
ALTER TABLE `vente_direct`
  ADD KEY `id_lieu_achat` (`id_lieu_achat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `lieu_achat`
--
ALTER TABLE `lieu_achat`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ecommerce`
--
ALTER TABLE `ecommerce`
  ADD CONSTRAINT `ecommerce_ibfk_2` FOREIGN KEY (`id_lieu_achat`) REFERENCES `lieu_achat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produits_ibfk_2` FOREIGN KEY (`id_lieu_achat`) REFERENCES `lieu_achat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vente_direct`
--
ALTER TABLE `vente_direct`
  ADD CONSTRAINT `vente_direct_ibfk_2` FOREIGN KEY (`id_lieu_achat`) REFERENCES `lieu_achat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
