<?php

// Si $_GET['categorie'] n'existe pas vaut toute catégorie
if(!isset($_GET['categorie']) || empty($_GET['categorie'])){
    $select_categorie = '';
}
else{
    $select_categorie = $_GET['categorie'];
}

// Définie l'ordre d'affichage des produits
if(isset($_GET['order']) || !empty($_GET['order'])){
    if($_GET['order'] == 'date_croissant'){
        $order = 'date_croissant';
    }elseif($_GET['order'] == 'date_decroissant'){
        $order = 'date_decroissant';
    }elseif($_GET['order'] == 'prix_croissant'){
        $order = 'prix_croissant';
    }elseif($_GET['order'] == 'prix_decroissant'){
        $order = 'prix_decroissant';
    }
}else{
    $order = 'date_croissant';
}