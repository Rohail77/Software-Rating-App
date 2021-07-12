import { database } from '../config/database_config';
import { authorization } from '../components/gateway/auth/Authorization';

class User {
  setUser() {
    this.email = authorization.getEmail();
    this.userRef = database.collection('Users').doc(this.email);
    this.setUserName();
  }

  setUserName() {
    this.userRef.get().then(doc => {
      this.name = doc.data().name;
    });
  }

  updateUserName(newName) {
    this.userRef
      .update({
        name: newName,
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser() {
    this.userRef
      .delete()
      .then(() => {
        console.log('User deleted Successfully');
      })
      .catch(error => {
        console.log(error);
      });
  }

  writeUser(user) {
    database
      .collection('Users')
      .doc(user.email)
      .set(user)
      .catch(error => {
        console.log(error);
      });
  }

  canReview(softwareID, cb) {
    database
      .collection('Softwares')
      .doc(softwareID)
      .collection('Reviews')
      .doc(this.email)
      .get()
      .then(doc => {
        doc.exists ? cb(false) : cb(true);
      });
  }
}

export const user = new User();
