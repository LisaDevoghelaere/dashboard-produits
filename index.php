<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

require_once 'bdd.php';

$template = $twig->load('base.html.twig');
echo $template->render(array(
    'user' => 'Admin',
    'categorieTitle' => 'Titre de la catégorie',
));