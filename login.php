<?php session_start();
// deconnection du dashboard lors du chargement
if (isset($_SESSION['admin'])) {
    unset($_SESSION['admin']);
}
if (isset($_SESSION['user'])) {
    unset($_SESSION['user']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Produck</title>
    <link rel="icon" href="images/favicon.png" />
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container">
        <form id="connect" action="back/authentification.php" method="POST">
            <img class="text-center" src="images/produck-logo.svg" alt="">
            <div class="form-group">
              <label for="user"><span class="far fa-user"></span> Utilisateur :</label>
              <input type="text" class="form-control" id="user" name="user" placeholder="Nom d'utilisateur (admin)">
            </div>
            <div class="form-group">
              <label for="password"><span class="fas fa-key"></span> Mot de passe :</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe (admin)">
              <ul id="form-messages"class="text-warning"></ul>
            </div>
            <button id="btn-submit" type="submit" class="btn btn-warning"><span class="fas fa-sign-in-alt"></span> Se connecter</button>
        </form>
    </div>


<!-- Bootstrap  -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<!-- Fontawesome -->
<script src="https://kit.fontawesome.com/eee80a1a35.js" crossorigin="anonymous"></script>
<script src="js/login.js"></script>
</body>
</html>