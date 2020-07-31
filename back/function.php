<?php

// Fonction liste des catégories _____________________________________________________
function categories(){
    require 'bdd.php';

    $sql = 'SELECT categorie FROM categories';
    $req = $bdd -> query($sql);
    return $req;
}

// Fonction liste des produits _______________________________________________________
function produits_list(){
    // Récupère le le numéro de page et la limite pour afficher les produits
    require 'pagination.php';

    // Récupère la valeur de $select_categorie et de $order
    require 'filtre.php';

    if($order == NULL){
        $order_req = 'p.id ASC';
    }elseif($order == 'date_croissant'){
        $order_req = 'p.date_achat ASC';
    }elseif($order == 'date_decroissant'){
        $order_req = 'p.date_achat DESC';
    }elseif($order == 'prix_croissant'){
        $order_req = 'p.prix ASC';
    }elseif($order == 'prix_decroissant'){
        $order_req = 'p.prix DESC';
    }

    if(empty($select_categorie)){
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);

    } else{
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id WHERE c.categorie = :categorie ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);
        $req -> bindValue('categorie', $select_categorie, PDO::PARAM_STR);
    }

    $req -> bindValue('debut', $debut, PDO::PARAM_INT);
    $req -> bindValue('limit', $limit, PDO::PARAM_INT);
    $req -> execute();

    return $req;
}

// Finction modal détail des produits _________________________________________________
function detail_modal($id){
    require 'bdd.php';

    $array = array();
    if(isset($_GET['id'])){
        $id = $_GET['id'];
    } else{
        $id = "";
    }

    // récupère les détails du produit selon $id
    $sql = 'SELECT p.id, p.nom,	p.reference, p.prix, p.date_achat, p.date_fin_garantie, p.conseil, p.manuel_utilisation, p.ticket_achat, p.id_categorie, c.categorie FROM produits AS p JOIN categories AS c ON p.id_categorie = c.id WHERE p.id = :id';
    $req = $bdd -> prepare($sql);

    $req -> bindValue('id', $id, PDO::PARAM_INT);
    $req -> execute();

    $produit = $req -> fetch();
    // insère résultat de la requète précédente
    array_push($array, $produit);
    $req -> closeCursor();

    // récupère id du lieu d'achat
    $sql = 'SELECT l.id FROM produits AS p INNER JOIN lieu_achat AS l ON p.id_lieu_achat = l.id WHERE p.id = :id';

    $req = $bdd -> prepare($sql);
    $req -> bindValue('id', $id, PDO::PARAM_INT);
    $req -> execute();
    $id_lieu_achat = $req -> fetch();

    $req -> closeCursor();
    // selon l'id du lieu d'achat va chercher dans la table correspondant
    if($id_lieu_achat[0] == 1){
        $sql = 'SELECT e.url FROM ecommerce AS e INNER JOIN lieu_achat AS l ON e.id_lieu_achat = l.id WHERE e.id_produit = :id AND e.id_lieu_achat = :id_lieu_achat';
    } elseif($id_lieu_achat[0] == 2){
        $sql = 'SELECT v.nom_vendeur, v.ville, v.code_postal, v.rue FROM vente_direct AS v INNER JOIN lieu_achat AS l ON v.id_lieu_achat = l.id WHERE v.id_produit = :id AND v.id_lieu_achat = :id_lieu_achat';
    }

    $adresse_lieu_achat = $bdd -> prepare($sql);
    $adresse_lieu_achat -> bindValue('id', $id, PDO::PARAM_INT);
    $adresse_lieu_achat -> bindValue('id_lieu_achat', $id_lieu_achat[0], PDO::PARAM_INT);
    $adresse_lieu_achat -> execute();
    $array_adresse_lieu_achat = $adresse_lieu_achat -> fetch();

    array_push($array, $array_adresse_lieu_achat);
    $adresse_lieu_achat -> closeCursor();

    // récupère les photos du produit
    $sql = 'SELECT ph.nom_photo FROM produits AS p INNER JOIN photos AS ph ON ph.id_produit = p.id WHERE p.id = :id';

    $photo = $bdd -> prepare($sql);

    $photo -> bindValue('id', $id, PDO::PARAM_INT);
    $photo -> execute();

    $array_photo = $photo -> fetch();
    array_push($array, $array_photo);
    $photo -> closeCursor();


    // var_dump($array);
    return json_encode($array);
}