import history from '../history.js'
import wilddog from 'wilddog';

export const RECEIVED_POSTS = 'RECEIVED_POSTS'
export const RECEIVED_USER = 'RECEIVED_USER'

export const receivedPosts = (posts) => ({
    type: RECEIVED_POSTS,
    posts
})

export const receivedUser = (user) => ({
    type: RECEIVED_USER,
    user
})


const config = {
    syncURL: "https://rinterest.wilddogio.com",
    authDomain: "rinterest.wilddog.com"
};
wilddog.initializeApp(config);
const itemsRef = wilddog.sync().ref("/rinterest/article/react");

export function fetchPostsIfNeeded() {
    return function(dispatch) {
        itemsRef.on("value", function(snapshot) {
            var posts = [];
            snapshot.forEach(function(childSnapshot) {
                var post = childSnapshot.val();
                posts.push(post);
            });
            dispatch(receivedPosts(posts))
        });
    }
}

export function loggingIn(user, password, push) {
    return function() {
        wilddog.auth().signInWithEmailAndPassword(user, password).then(function(res) {
            console.log(res);
            push('/');
        }).catch(function(error) {
            alert("账户和密码不匹配~!");
            console.log(error)
        });
    }
}

export function registering(user, password, push){
    return function(){
        wilddog.auth().createUserWithEmailAndPassword(user, password).then(function(res) {
            console.log(res);
            push('/');
        }).catch(function(error) {
            console.log(error);
        });
    }
}

export function signOut(){
    return function() {
        wilddog.auth().signOut().then(function() {
            console.log("sign-out")
            history.push('/');
            location.reload(true)
        }).catch(function(error) {
            console.log("sign-out-error")
        });
    }
}

export function authState(){
  return function(dispatch){
    wilddog.auth().onAuthStateChanged(function(user) {
        if (user) {
            dispatch(receivedUser(user))
        } else {
            console.log("no user");
        }
    });
  }
}
