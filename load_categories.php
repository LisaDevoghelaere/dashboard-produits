<?php
session_start();
if (($_SESSION['admin'] = false) || (!isset($_SESSION['user']))) {
    header('Location: login.php');
}

require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
    ]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

// Pagination
require 'back/pagination.php';

// Tri par catégorie
require 'back/filtre.php';

// Liste des fonction
require 'back/function.php';

$template = $twig->load('categories.html.twig');
echo $template->render(array(
    'admin' => $_SESSION['admin'], // Si true authentification réussi, si false mauvaise authentification
    'user' => $_SESSION['user'], // Nom du l'utilisateur
    'categorieTitle' => $select_categorie,
    'order' => $order,
    'categories' => categories(),
    'produits_list' => produits_list(),
    'nombre_page' => $nombre_page,
    'page_courante' => $current_page,
));