<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <script src="js/script.js"></script>
    <script src="js/deck.js"></script>
    <title>Μουτζούρης</title>
</head>
<body>

<div class="header">
  <h2>Μουτζούρης</h2>
</div>

<div class="row">
  <div class="column side">
    <h2 id="gameIdTitle" style="display: none;">Κωδικός παιχνιδιού:</h2>
    <h3 id="gameId"></h3>
    <h3 id="gameStart" style="display: none;">Δώσε τον κωδικό στον αντίπαλό σου.</h3>
    <h3 id="turn"></h3>
  </div>
  <div class="column middle">
    <div id="inp" style="text-align: center; display:none">
    <p id="insertCode">Εισάγετε τον κωδικό</p>
      <form id="Form">
        <input type="text" id="form" name="name" required>
        <button type='button' onclick="connectToGame()">Παίξε</button>
        <p id="wrong"></p>
      </form>
      <div class="deck">
        <h3 id="c" style="display: none;">Οι κάρτες σου</h3>
        <div id="deck"></div>
      </div>
      <div class="deck2">
      <h3 id="c2" style="display: none;">Οι κάρτες του αντιπάλου</h3>
        <div id="deck2"></div>
      </div>
    </div>
    
<br>
<br>
<br>
<br>
    <div class="btn-group">
        <button class="button" id="first" onclick="playF()">Παίξε με φίλο/η</button>
        <button class="button" id="create" style="display: none;" onclick="createGame()" >Δημιούργησε παιχνίδι</button>
        <button class="button" id="connect" style="display: none; margin-top: 50px" onclick="showInput()">Συνδέσου παιχνίδι</button>
    </div>`
  </div>
  <div class="column side">
  <h2>
  	Στόχος :
  </h2>
  <p>Ο στόχος του παιχνιδιού είναι να μείνεις χωρίς φύλλα στο χέρι. Αυτός που θα μείνει με ένα φύλλο είναι ο 	χαμένος.</p>
  <h2>Προετοιμασία :</h2>
  <p>Πριν ξεκινήσετε αφαιρείτε από την τράπουλα όλες τις φιγούρες  και κρατάτε μόνο τον Ρήγα Μπαστούνι.</p>
  <h2>Διαδικασία παιχνιδιού :
</h2>
  <p>Αφού ανακατέψουμε καλά, μοιράζουμε όλη την τράπουλα στους παίχτες έτσι ώστε όλοι να έχουν των ίδιο αριθμό φύλλων 
    (ή + - 1). Κάθε παίχτης αφαιρεί από τα φύλλα που έχει στα χέρια του τα ζευγάρια, δηλαδή, 2 Άσσους 2 δυάρια 2 τριάρια 
    κ.τ.λ. Τα υπόλοιπα τα κρατάμε στο χέρι σαν βεντάλια έτσι ώστε να μπορεί ο άλλος παίχτης να διαλέξει, χωρίς να τα βλέπει, 
    ένα από αυτά. Ο πρώτος παίχτης τραβάει ένα φύλλο από αυτόν που κάθετε στα αριστερά του, αν κάνει ζευγάρι το νέο χαρτί 
    με κάποια από τα δικά του τότε τα ρίχνει, αλλιώς τα κρατάει και συνεχίζει ο επομένως που είναι στα δεξιά του. \
    Όποιος ζευγαρώσει όλα τα φύλλα του βγαίνει από το παιχνίδι. Όποιος μείνει τελευταίος με τον Ρήγα Μπαστούνι 
    (τον Μουτζούρη) στο χέρι του είναι ο χαμένος, και οι υπόλοιποι παίχτες αποφασίζουν την ποινή του.</p>
  </div>
</div>


</body>
</html>