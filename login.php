<?php session_start();
    // deconnection du dashboard lors du chargement
    if(isset($_SESSION['admin'])){
        unset($_SESSION['admin']);
    }
    if(isset($_SESSION['user'])){
        unset($_SESSION['user']);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Dashboard Produits</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container">
        <form action="back/authentification.php" method="POST">
            <h1 class="text-success">Dashboard Produits</h1>
            <div class="form-group">
              <label for="user"><span class="far fa-user"></span> Utilisateur :</label>
              <input type="text" class="form-control" id="user" name="user" placeholder="Nom d'utilisateur">
              <p id="msg1" class="text-warning">message d'avertissement !</p>
            </div>
            <div class="form-group">
              <label for="password"><span class="fas fa-key"></span> Mot de passe :</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe">
              <p id="msg2" class="text-warning">message d'avertissement !</p>
            </div>
            <button type="submit" class="btn btn-warning"><span class="fas fa-sign-in-alt"></span> Se connecter</button>
        </form>
    </div>


<!-- Bootstrap  -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<!-- Fontawesome -->
<script src="https://kit.fontawesome.com/eee80a1a35.js" crossorigin="anonymous"></script>
</body>
</html>