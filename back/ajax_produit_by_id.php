<?php
require 'function.php';

if(isset($_POST['id'])){
    echo detail_modal($_POST['id']);
}