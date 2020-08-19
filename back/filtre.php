<?php

// Si $_POST['categorie'] n'existe pas vaut toute catégorie
if(!isset($_POST['categorie']) || empty($_POST['categorie'])){
    $select_categorie = '';
}
else{
    $select_categorie = $_POST['categorie'];
}

// Définie l'ordre d'affichage des produits
if(isset($_POST['order']) || !empty($_POST['order'])){
    if($_POST['order'] == 'date_croissant'){
        $order = 'date_croissant';
    }elseif($_POST['order'] == 'date_decroissant'){
        $order = 'date_decroissant';
    }elseif($_POST['order'] == 'prix_croissant'){
        $order = 'prix_croissant';
    }elseif($_POST['order'] == 'prix_decroissant'){
        $order = 'prix_decroissant';
    }
}else{
    $order = 'date_croissant';
}