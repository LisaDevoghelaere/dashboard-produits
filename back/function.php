<?php
use Respect\Validation\Validator as v;

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

    if($order == 'date_croissant'){
        $order_req = 'p.date_achat ASC';
    }elseif($order == 'date_decroissant'){
        $order_req = 'p.date_achat DESC';
    }elseif($order == 'prix_croissant'){
        $order_req = 'p.prix ASC';
    }elseif($order == 'prix_decroissant'){
        $order_req = 'p.prix DESC';
    }

    $search = '%%';
    if(isset($_POST['search'])){
        $search= str_replace('"', '',$_POST['search']);
        $search = "%" . $search . "%";
    }

    if(empty($select_categorie)){
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie, ph.nom_photo FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id INNER JOIN photos AS ph ON p.id = ph.id_produit WHERE upper(p.nom) LIKE upper(:search) ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);

    } else{
        $sql = 'SELECT p.id, p.nom, p.reference, p.prix, p.date_achat, p.date_fin_garantie, c.categorie, ph.nom_photo FROM produits AS p INNER JOIN categories AS c ON p.id_categorie = c.id INNER JOIN photos AS ph ON p.id = ph.id_produit WHERE c.categorie = :categorie AND upper(p.nom) LIKE upper(:search) ORDER BY ' . $order_req . ' LIMIT :debut, :limit';

        $req = $bdd -> prepare($sql);
        $req -> bindParam('categorie', $select_categorie, PDO::PARAM_STR);
    }

    $req -> bindValue('debut', $debut, PDO::PARAM_INT);
    $req -> bindValue('limit', $limit, PDO::PARAM_INT);
    $req -> bindValue('search', $search, PDO::PARAM_STR);
    $req -> execute();

    return $req;
}

// Fonction modal détail des produits _________________________________________________
function detail_modal(){
    require 'bdd.php';
    require '../vendor/autoload.php';

    $array = array();
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        if(v::intVal()->positive()->validate($id) == false){
            return 'Paramètre ID invalide';
        }
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

    // liste des catégories
    $sql = 'SELECT categorie FROM categories';
    $categorie = $bdd -> query($sql);
    $array_categories = [];
    while($donnees = $categorie->fetchColumn()){
        array_push($array_categories, $donnees);
    }

    $categories = ["categories" => $array_categories];
    array_push($array, $categories);


    return json_encode($array);
}

// Fonction ajout de produits _____________________________________________________
function add_product(){
    require 'bdd.php';
    require '../vendor/autoload.php';

    $id_produit = '';
    $nom_produit = $_POST['nom'];
    if(v::stringVal()->validate($nom_produit) == false){
        return json_encode('Nom de produit invalide');
    }
    $reference_produit = $_POST['reference'];
    if(v::intVal()->positive()->max(99999999999999999999)->validate($reference_produit) == false){
        return json_encode('Référence invalide');
    }
    $prix_produit = $_POST['prix'];
    if(v::number()->max(9999999999)->validate($prix_produit) == false){
        return json_encode('Prix invalide');
    }
    $date_achat_produit = $_POST['date_achat'];
    if(v::date()->validate($date_achat_produit) == false){
        return json_encode('Date d\'achat invalide');
    }
    $date_garantie_produit = $_POST['date_garantie'];
    if(v::date()->validate($date_achat_produit) == false){
        return json_encode('Date de fin de garantie invalide');
    }
    if($date_achat_produit > $date_garantie_produit){
        return json_encode('La date d\'achat ne peut pas être supérieur à la date de fin de garantie');
    }
    $conseil_produit = $_POST['conseil'];
    if(v::stringVal()->validate($conseil_produit) == false){
        return json_encode('Conseil d\'utlisation invalide');
    }

    $manuel_utilisation_produit = $_POST['manuel'];
    if(v::stringVal()->validate($manuel_utilisation_produit) == false){
        return json_encode('Url manuel invalide');
    }
    $ticket_achat_produit = $_POST['ticket'];
    if(v::stringVal()->validate($ticket_achat_produit) == false){
        return json_encode('Url ticket achat invalide');
    }

    if(isset($_POST['url']) && !isset($_POST['vendeur']) && !isset($_POST['ville']) && !isset($_POST['code_postal']) && !isset($_POST['rue'])){
        $url = $_POST['url'];
        if(v::url()->validate($url) == false){
            return json_encode('Url du vendeur invalide');
        }    
        $nom_vendeur = '';
        $ville = '';
        $code_postal = '';
        $rue = '';  
    } elseif(!isset($_POST['url']) && isset($_POST['vendeur']) && isset($_POST['ville']) && isset($_POST['code_postal']) && isset($_POST['rue'])){
        $url = '';
        $nom_vendeur = $_POST['vendeur'];
        if(v::stringVal()->validate($nom_vendeur) == false){
            return json_encode('Nom vendeur invalide');
        }    
        $ville = $_POST['ville'];
        if(v::stringVal()->validate($ville) == false){
            return json_encode('Nom de ville invalide');
        }
        $code_postal = $_POST['code_postal'];
        if(v::intVal()->positive()->validate($code_postal) == false){
            return json_encode('Code postal invalide');
        }    
        $rue = $_POST['rue'];
        if(v::stringVal()->validate($rue) == false){
            return json_encode('Nom de rue invalide');
        }    
    }

    $id_lieu_achat = '';
    $id_categorie = '';

    $categorie = $_POST['categorie'];
    if(v::stringVal()->validate($categorie) == false){
        return json_encode('Nom de catégorie invalide');
    }

    $photo = $_POST['photo'];
    if(v::stringVal()->validate($photo) == false){
        return json_encode('Url photo invalide');
    }


    // Récupère l'id de la catégorie
    $sql = "SELECT id FROM categories WHERE categorie = :categorie";
    $req_categorie = $bdd -> prepare($sql);

    $req_categorie -> bindParam(':categorie', $categorie, PDO::PARAM_STR);
    $req_categorie -> execute();

    $id_categorie = $req_categorie -> fetchColumn();
    $req_categorie -> closeCursor();

    // Insère le nouveau produit
    $sql = 'INSERT INTO produits(nom, reference, prix, date_achat, date_fin_garantie, id_categorie, conseil,manuel_utilisation, ticket_achat, id_lieu_achat) VALUES (:nom, :reference, :prix, :date_achat, :date_fin_garantie, :id_categorie, :conseil, :manuel_utilisation, :ticket_achat, :id_lieu_achat)';

    // Change le lieu d'achat selon l'id
    if($url !== '' && $ville == '' && $code_postal == '' && $nom_vendeur == '' && $rue == ''){
        $id_lieu_achat = 1;

        $insert_product = $bdd -> prepare($sql);
        $insert_product -> bindValue('id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
    }elseif($url == '' && $ville !== '' && $code_postal !== '' && $nom_vendeur !== '' && $rue !== ''){
        $id_lieu_achat = 2;

        $insert_product = $bdd -> prepare($sql);
        $insert_product -> bindValue('id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
    }

    $insert_product -> bindParam('nom', $nom_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('reference', $reference_produit, PDO::PARAM_INT);
    $insert_product -> bindValue('prix', $prix_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('date_achat', $date_achat_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('date_fin_garantie', $date_garantie_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('id_categorie', $id_categorie, PDO::PARAM_INT);
    $insert_product -> bindParam('conseil', $conseil_produit, PDO::PARAM_STR);
    $insert_product -> bindParam('manuel_utilisation', $manuel_utilisation_produit, PDO::PARAM_STR);
    $insert_product -> bindParam('ticket_achat', $ticket_achat_produit, PDO::PARAM_STR);
    $insert_product -> execute();

    $insert_product -> closeCursor();

    // Récupère l'id du dernier produit
    $sql = 'SELECT LAST_INSERT_ID() FROM produits';

    $id_last_product = $bdd -> query($sql);
    $id_produit = $id_last_product -> fetchColumn();

    $id_last_product -> closeCursor();

    // Insertion table e-commerce ou vente direct selon id du lieu d'achat
    if($id_lieu_achat == 1){
        $sql = 'INSERT INTO ecommerce(id_lieu_achat, id_produit, url) VALUES(:id_lieu_achat, :id_produit, :url)';

        $insert_ecommerce = $bdd->prepare($sql);
        
        $insert_ecommerce->bindValue(':id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
        $insert_ecommerce->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
        $insert_ecommerce->bindParam(':url', $url, PDO::PARAM_STR);
        $insert_ecommerce->execute();

        $insert_ecommerce->closeCursor();

    } elseif($id_lieu_achat == 2){
        $sql = 'INSERT INTO vente_direct(nom_vendeur, id_lieu_achat, id_produit, ville, code_postal, rue) VALUES(:nom_vendeur, :id_lieu_achat, :id_produit, :ville, :code_postal, :rue)';

        $insert_vente_direct = $bdd->prepare($sql);
        $insert_vente_direct->bindParam(':nom_vendeur', $nom_vendeur, PDO::PARAM_STR);
        $insert_vente_direct->bindValue(':id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
        $insert_vente_direct->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
        $insert_vente_direct->bindParam(':ville', $ville, PDO::PARAM_STR);
        $insert_vente_direct->bindValue(':code_postal', $code_postal, PDO::PARAM_INT);
        $insert_vente_direct->bindParam(':rue', $rue, PDO::PARAM_STR);
        $insert_vente_direct->execute();

        $insert_vente_direct->closeCursor();
    }

    // insertion des photos selon id du produit
    $sql = 'INSERT INTO photos(id_produit, nom_photo) VALUES(:id_produit, :nom_photo)';

    $insert_photo = $bdd->prepare($sql);

    $insert_photo->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
    $insert_photo->bindParam(':nom_photo', $photo, PDO::PARAM_STR);
    $insert_photo->execute();

    $insert_photo->closeCursor();

    return json_encode('ok');
}

// Fonction suppression d'un produit _________________________________________________
function delete_product($id){
    require 'bdd.php';

    // Récupère l'id du lieu d'achat pour suppresion dans la table correspondant
    $sql = 'SELECT id_lieu_achat FROM produits WHERE id = :id';
    $req = $bdd->prepare($sql);
    $req->bindValue(':id', $id, PDO::PARAM_INT);
    $req->execute();
    $id_lieu_achat = $req -> fetchColumn();
    $req->closeCursor();

    // Suppression du produit dans table produits
    $sql = 'DELETE FROM produits WHERE id = :id';

    $delete_product = $bdd->prepare($sql);
    $delete_product->bindValue(':id', $id, PDO::PARAM_INT);
    $delete_product->execute();
    $delete_product->closeCursor();

    // Suppression du poduit dans la table du lieu d'achat correspondant
    if($id_lieu_achat == 1){
        $sql = 'DELETE FROM ecommerce WHERE id_produit = :id_produit';

        $delete_ecommerce = $bdd->prepare($sql);
        $delete_ecommerce->bindValue(':id_produit', $id, PDO::PARAM_INT);
        $delete_ecommerce->execute();
        $delete_ecommerce->closeCursor();
    } elseif($id_lieu_achat == 2){
        $sql = 'DELETE FROM vente_direct WHERE id_produit = :id_produit';

        $delete_vente_direct = $bdd->prepare($sql);
        $delete_vente_direct->bindValue(':id_produit', $id, PDO::PARAM_INT);
        $delete_vente_direct->execute();
        $delete_vente_direct->closeCursor();
    }

    // Suppression des photos selon id du produit
    $sql = 'DELETE FROM photos WHERE id_produit = :id_produit';

    $delete_photo = $bdd->prepare($sql);
    $delete_photo->bindValue(':id_produit', $id, PDO::PARAM_INT);
    $delete_photo->execute();
    $delete_photo->closeCursor();

    return json_encode('ok');
}

// Fonction modification de produits _____________________________________________________
function update_product($id){
    require 'bdd.php';
    require '../vendor/autoload.php';

    $id_produit = $id;
    $nom_produit = $_POST['nom'];
    if(v::stringVal()->validate($nom_produit) == false){
        return json_encode('Nom de produit invalide');
    }
    $reference_produit = $_POST['reference'];
    if(v::intVal()->positive()->max(99999999999999999999)->validate($reference_produit) == false){
        return json_encode('Référence invalide');
    }
    $prix_produit = $_POST['prix'];
    if(v::number()->max(9999999999)->validate($prix_produit) == false){
        return json_encode('Prix invalide');
    }
    $date_achat_produit = $_POST['date_achat'];
    if(v::date()->validate($date_achat_produit) == false){
        return json_encode('Date d\'achat invalide');
    }
    $date_garantie_produit = $_POST['date_garantie'];
    if(v::date()->validate($date_achat_produit) == false){
        return json_encode('Date de fin de garantie invalide');
    }
    if($date_achat_produit > $date_garantie_produit){
        return json_encode('La date d\'achat ne peut pas être supérieur à la date de fin de garantie');
    }
    $conseil_produit = $_POST['conseil'];
    if(v::stringVal()->validate($conseil_produit) == false){
        return json_encode('Conseil d\'utlisation invalide');
    }

    $manuel_utilisation_produit = $_POST['manuel'];
    if(v::stringVal()->validate($manuel_utilisation_produit) == false){
        return json_encode('Url manuel invalide');
    }
    $ticket_achat_produit = $_POST['ticket'];
    if(v::stringVal()->validate($ticket_achat_produit) == false){
        return json_encode('Url ticket achat invalide');
    }

    if(isset($_POST['url']) && !isset($_POST['vendeur']) && !isset($_POST['ville']) && !isset($_POST['code_postal']) && !isset($_POST['rue'])){
        $url = $_POST['url'];
        if(v::url()->validate($url) == false){
            return json_encode('Url du vendeur invalide');
        }    
        $nom_vendeur = '';
        $ville = '';
        $code_postal = '';
        $rue = '';
    } elseif(!isset($_POST['url']) && isset($_POST['vendeur']) && isset($_POST['ville']) && isset($_POST['code_postal']) && isset($_POST['rue'])){
        $url = '';
        $nom_vendeur = $_POST['vendeur'];
        if(v::stringVal()->validate($nom_vendeur) == false){
            return json_encode('Nom vendeur invalide');
        }    
        $ville = $_POST['ville'];
        if(v::stringVal()->validate($ville) == false){
            return json_encode('Nom de ville invalide');
        }
        $code_postal = $_POST['code_postal'];
        if(v::intVal()->positive()->validate($code_postal) == false){
            return json_encode('Code postal invalide');
        }    
        $rue = $_POST['rue'];
        if(v::stringVal()->validate($rue) == false){
            return json_encode('Nom de rue invalide');
        }    
    }

    $id_lieu_achat = '';
    $id_categorie = '';

    $categorie = $_POST['categorie'];
    if(v::stringVal()->validate($categorie) == false){
        return json_encode('Nom de catégorie invalide');
    }

    $photo = $_POST['photo'];
    if(v::stringVal()->validate($photo) == false){
        return json_encode('Url photo invalide');
    }

    // Récupère l'id de la catégorie
    $sql = 'SELECT id FROM categories WHERE categorie = :categorie';
    $req_categorie = $bdd -> prepare($sql);

    $req_categorie -> bindParam(':categorie', $categorie, PDO::PARAM_STR);
    $req_categorie -> execute();
    $id_categorie = $req_categorie -> fetchColumn();
    $req_categorie -> closeCursor();

    // Récupère l'id du lieu d'achat du produit à modifier
    $sql = 'SELECT id_lieu_achat FROM produits WHERE id = :id';
    $req_lieu_achat = $bdd -> prepare($sql);

    $req_lieu_achat -> bindValue(':id', $id_produit, PDO::PARAM_INT);
    $req_lieu_achat -> execute();
    $id_lieu_achat_temp = $req_lieu_achat -> fetchColumn();
    $id_lieu_achat_temp = (int) $id_lieu_achat_temp;
    $req_lieu_achat -> closeCursor();
    
    // Insère le nouveau produit
    $sql = 'UPDATE produits SET nom = :nom, reference = :reference, prix = :prix, date_achat = :date_achat, date_fin_garantie = :date_fin_garantie, id_categorie = :id_categorie, conseil = :conseil, manuel_utilisation = :manuel_utilisation, ticket_achat = :ticket_achat, id_lieu_achat = :id_lieu_achat WHERE id = :id_produit';

    // Change le lieu d'achat selon l'id
    if($url !== '' && $ville == '' && $code_postal == '' && $nom_vendeur == '' && $rue == ''){
        $id_lieu_achat = 1;

        $insert_product = $bdd -> prepare($sql);
        $insert_product -> bindValue('id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
    }elseif($url == '' && $ville !== '' && $code_postal !== '' && $nom_vendeur !== '' && $rue !== ''){
        $id_lieu_achat = 2;

        $insert_product = $bdd -> prepare($sql);
        $insert_product -> bindValue('id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
    }

    $insert_product -> bindParam('nom', $nom_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('reference', $reference_produit, PDO::PARAM_INT);
    $insert_product -> bindValue('prix', $prix_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('date_achat', $date_achat_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('date_fin_garantie', $date_garantie_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('id_categorie', $id_categorie, PDO::PARAM_INT);
    $insert_product -> bindParam('conseil', $conseil_produit, PDO::PARAM_STR);
    $insert_product -> bindParam('manuel_utilisation', $manuel_utilisation_produit, PDO::PARAM_STR);
    $insert_product -> bindParam('ticket_achat', $ticket_achat_produit, PDO::PARAM_STR);
    $insert_product -> bindValue('id_produit', $id_produit, PDO::PARAM_INT);
    $insert_product -> execute();

    $insert_product -> closeCursor();
    // Insertion table e-commerce ou vente direct selon id du lieu d'achat
    if($id_lieu_achat_temp == 1){
        if($id_lieu_achat_temp == $id_lieu_achat){
            // Si update correspondant la valeur déjà existante
            $sql = 'UPDATE ecommerce SET url = :url WHERE id_produit = :id_produit';
    
            $insert_ecommerce = $bdd->prepare($sql);
    
            $insert_ecommerce->bindParam(':url', $url, PDO::PARAM_STR);
            $insert_ecommerce->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $insert_ecommerce->execute();
    
            $insert_ecommerce->closeCursor();
        } else{
            // Suppression dans la table à remplacer
            $sql = 'DELETE FROM ecommerce WHERE id_produit = :id_produit';
            
            $delete_last_lieu_achat = $bdd->prepare($sql);
            $delete_last_lieu_achat->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $delete_last_lieu_achat->execute();

            $delete_last_lieu_achat->closeCursor();

            // Insertion dans la nouvelle table
            $sql = 'INSERT INTO vente_direct (nom_vendeur, id_lieu_achat, id_produit, ville, code_postal, rue) VALUES(:nom_vendeur, :id_lieu_achat, :id_produit, :ville, :code_postal, :rue)';
            $insert_new_lieu_achat = $bdd->prepare($sql);

            $insert_new_lieu_achat->bindParam(':nom_vendeur', $nom_vendeur, PDO::PARAM_STR);
            $insert_new_lieu_achat->bindValue(':id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
            $insert_new_lieu_achat->bindParam(':ville', $ville, PDO::PARAM_STR);
            $insert_new_lieu_achat->bindValue(':code_postal', $code_postal, PDO::PARAM_INT);
            $insert_new_lieu_achat->bindParam(':rue', $rue, PDO::PARAM_STR);
            $insert_new_lieu_achat->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $insert_new_lieu_achat->execute();    
            
            $insert_new_lieu_achat->closeCursor();
            
        }
        
    } elseif($id_lieu_achat_temp == 2){
        if($id_lieu_achat_temp == $id_lieu_achat){
            $sql = 'UPDATE vente_direct SET nom_vendeur = :nom_vendeur, ville = :ville, code_postal = :code_postal, rue = :rue WHERE id_produit = :id_produit';
    
            $insert_vente_direct = $bdd->prepare($sql);
            
            $insert_vente_direct->bindParam(':nom_vendeur', $nom_vendeur, PDO::PARAM_STR);
            $insert_vente_direct->bindParam(':ville', $ville, PDO::PARAM_STR);
            $insert_vente_direct->bindValue(':code_postal', $code_postal, PDO::PARAM_INT);
            $insert_vente_direct->bindParam(':rue', $rue, PDO::PARAM_STR);
            $insert_vente_direct->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $insert_vente_direct->execute();
            
            $insert_vente_direct->closeCursor();
        } else{
            // Suppression dans la table à remplacer
            $sql = 'DELETE FROM vente_direct WHERE id_produit = :id_produit';

            $delete_last_lieu_achat = $bdd->prepare($sql);
            $delete_last_lieu_achat->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $delete_last_lieu_achat->execute();

            $delete_last_lieu_achat->closeCursor();

            // Insertion dans la nouvelle table
            $sql = 'INSERT INTO ecommerce (id_lieu_achat, id_produit, url) VALUES(:id_lieu_achat, :id_produit, :url)';
            $insert_new_lieu_achat = $bdd->prepare($sql);

            $insert_new_lieu_achat->bindValue(':id_lieu_achat', $id_lieu_achat, PDO::PARAM_INT);
            $insert_new_lieu_achat->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
            $insert_new_lieu_achat->bindParam(':url', $url, PDO::PARAM_STR);
            $insert_new_lieu_achat->execute();    

            $insert_new_lieu_achat->closeCursor();

        }
    }

    // insertion des photos selon id du produit
    $sql = 'UPDATE photos SET nom_photo = :nom_photo WHERE id_produit = :id_produit';

    $insert_photo = $bdd->prepare($sql);

    $insert_photo->bindParam(':nom_photo', $photo, PDO::PARAM_STR);
    $insert_photo->bindValue(':id_produit', $id_produit, PDO::PARAM_INT);
    $insert_photo->execute();

    $insert_photo->closeCursor();

    return json_encode('ok');
}

// Ajout de catégorie ________________________________________________________________
function add_categories($categorie){
    require 'bdd.php';

    $sql = 'INSERT INTO categories (categorie) VALUES (:categorie)';
    $insert_categorie = $bdd -> prepare($sql);
    $insert_categorie -> bindParam(':categorie', $categorie, PDO::PARAM_STR);
    $insert_categorie -> execute();

    $insert_categorie -> closeCursor();
    
    return json_encode('ok');
}

// Fonction upload d'images _____________________________________________________
function upload_images(){
    $files_name = $_FILES['file']['name'];
    $files_tmp = $_FILES['file']['tmp_name'];
    $url = '..' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'product-main';
    move_uploaded_file($files_tmp, "$url" . DIRECTORY_SEPARATOR . "$files_name");
    echo json_encode($files_name);
}

// Fonction upload de manuel _____________________________________________________
function upload_manual(){
    $files_name = $_FILES['file']['name'];
    $files_tmp = $_FILES['file']['tmp_name'];
    $url = '..' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'product-manual';
    move_uploaded_file($files_tmp, "$url" . DIRECTORY_SEPARATOR . "$files_name");
    echo json_encode($files_name);
}

// Fonction upload de ticket _____________________________________________________
function upload_ticket(){
    $files_name = $_FILES['file']['name'];
    $files_tmp = $_FILES['file']['tmp_name'];
    $url = '..' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'product-ticket';
    move_uploaded_file($files_tmp, "$url" . DIRECTORY_SEPARATOR . "$files_name");
    echo json_encode($files_name);
}