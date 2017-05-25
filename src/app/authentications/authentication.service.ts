import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable()

export class AuthService {

    constructor(private Aauth: AngularFireAuth){}

    authChange(){
        this.Aauth.authState.subscribe(state=>{
            console.log(state);
            
        })
    }
    loginFacebook() {
        this.Aauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res=>{console.log(res.user.providerData)})
        .catch(error=>{console.log(error)});
    }

    loginGoogle() {
        this.Aauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)});
    }

    logout() {
        this.Aauth.auth.signOut()
            .then(res=> console.log(res))
            .catch(error=> console.log(error));
    }
}



// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '245236039287963',
//       cookie     : true,
//       xfbml      : true,
//       version    : 'v2.8'
//     });
//     FB.AppEvents.logPageView();   
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>