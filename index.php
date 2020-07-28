<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

// Liste des catégories
function categories(){
    require 'bdd.php';

    $sql = 'SELECT categorie FROM categories';
    $req = $bdd -> query($sql);
    return $req;
}

// Liste des produits
function produits_list(){
    require 'bdd.php';

    $sql = 'SELECT p.id, p.nom, p.reference, p.prix, c.categorie FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id';
    $req = $bdd -> query($sql);
    return $req;
}

$template = $twig->load('base.html.twig');
echo $template->render(array(
    'user' => 'Admin',
    'categorieTitle' => 'Titre de la catégorie',
    'categories' => categories(),
    'produits_list' => produits_list()
));