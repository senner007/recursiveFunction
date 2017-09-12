<?php
  $myFile = "path.json";
  $fh = fopen($myFile, 'w') or die("can't open file");
  $stringData = $_POST["data"];
  echo $stringData;
  fwrite($fh, $stringData);
  fclose($fh)
?>
