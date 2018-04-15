var url ="https://api.quizlet.com/2.0/users/Mayra_Martinez5";
var dataRef = new Firebase(url);


$accessToken = 'q4u76UFVbdrrbbaCJYZDvP';
$apiUrl = 'https://api.quizlet.com/2.0/users/Mayra_Martinez5?whitespace=1';

$curl = curl_init($apiUrl);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer '.$accessToken]);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($curl);
if ($json) {
	$data = json_decode($json);
	echo "You found {$data->username}!";
}

$('.content').hide();

// Auth using a popup.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

$(document).on('click', '.signIn', function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;
   $('.content').show();
   loggedIn();
   
  });
  $(this).removeClass('signIn')
    .addClass('signOut')
    .html('Sign Out Of Google');
});

$(document).on('click', '.signOut', function () {
  firebase.auth().signOut().then(function() {
    $('.content').hide();
  }, function(error) {
    // An error happened.
  });
  $(this).removeClass('signOut')
    .addClass('signIn')
    .html('Sign In With Google To See Schedule');
});