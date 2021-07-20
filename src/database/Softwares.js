import { database } from '../config/database_config';
import firebase from 'firebase';
import { user } from './User';
import { formatDate, getAverage } from './common functions/CommonFunctions';

class Database {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
    this.usersRef = database.collection('Users');
  }

  bindUpdaterToReview(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.id)
      .onSnapshot(doc => {
        cb();
      });
  }

  getSoftwares(cb) {
    const softwares = [];
    this.softwaresRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          softwares.push({ id: doc.id, ...doc.data() });
        });
        cb(softwares);
      })
      .catch(error => console.log('Error: ', error));
  }

  // addSoftwares() {
  //   softwares.forEach(software => {
  //     database.collection('Softwares').add(software);
  //   });
  // }

  getReviews(softwareID, cb) {
    const reviews = [];
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().review !== '') {
            reviews.push({
              id: doc.id,
              ...doc.data(),
              date: formatDate(doc.data().date.toDate()),
            });
          }
        });
        cb(reviews);
      })
      .catch(error => console.log('Error: ', error));
  }

  getSoftware(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        cb({ ...doc.data(), id: doc.id });
      })
      .catch(error => console.log('Error: ', error));
  }

  writeRating(softwareID, data) {
    return this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.id)
      .set({ ...data, date: firebase.firestore.Timestamp.now() });
  }

  incrementTotalReviews(softwareID) {
    return this.softwaresRef.doc(softwareID).update({
      total_reviews: firebase.firestore.FieldValue.increment(1),
    });
  }

  decrementTotalReviews(softwareID) {
    return this.softwaresRef.doc(softwareID).update({
      total_reviews: firebase.firestore.FieldValue.increment(-1),
    });
  }

  updateStarCount(softwareID, starType, updateType) {
    return this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + starType]:
        updateType === 'INC'
          ? firebase.firestore.FieldValue.increment(1)
          : firebase.firestore.FieldValue.increment(-1),
    });
  }

  async replaceStarCount(softwareID, incrementStarType, decrementStarType) {
    await this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + incrementStarType]:
        firebase.firestore.FieldValue.increment(1),
    });
    return await this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + decrementStarType]:
        firebase.firestore.FieldValue.increment(-1),
    });
  }

  updateAverageRating(softwareID) {
    return this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        return getAverage(doc.data().stars_count);
      })
      .then(averageRating => {
        return this.softwaresRef.doc(softwareID).update({
          average_rating: Number(averageRating.toFixed(1)),
        });
      });
  }
}

/*
const softwares = [
  {
    name: 'Postman',
    developer: 'Postman, Inc.',
    description:
      'Postman is the collaboration platform for API development. Postman simplifies each step of building an API and streamlines collaboration so you can create better APIs—faster.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Adobe Photoshop',
    developer: 'Adobe Inc.',
    description:
      'Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. for Windows and macOS. It was originally created in 1988 by Thomas and John Knoll. Since then, the software has become the industry standard not only in raster graphics editing, but in digital art as a whole',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Dropbox',
    developer: 'Dropbox, Inc.',
    description:
      'Dropbox is a file hosting service operated by the American company Dropbox, Inc., headquartered in San Francisco, California, that offers cloud storage, file synchronization, personal cloud, and client software.Dropbox brings everything—traditional files, cloud content, and web shortcuts—together in one place.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Chrome',
    developer: 'Google',
    description:
      'Google Chrome is a cross-platform web browser developed by Google. It was first released in 2008 for Microsoft Windows built with free software components from Apple WebKit and Mozilla Firefox. It was later ported to Linux, macOS, iOS, and Android where it is the default browser built into the OS.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Zoom',
    developer: 'Zoom Video Communications',
    description:
      'Zoom is a cloud-based video conferencing service you can use to virtually meet with others - either by video or audio-only or both, all while conducting live chats - and it lets you record those sessions to view later',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Eclipse',
    developer: 'Eclipse Foundation',
    description:
      'Eclipse is an integrated development environment (IDE) used in computer programming.[5] It contains a base workspace and an extensible plug-in system for customizing the environment. Eclipse is written mostly in Java and its primary use is for developing Java applications, but it may also be used to develop applications in other programming languages via plug-ins, including Ada, ABAP, C, C++, C#, Clojure, COBOL, D, Erlang, Fortran, Groovy, Haskell, JavaScript, Julia,[6] Lasso, Lua, NATURAL, Perl, PHP, Prolog, Python, R, Ruby (including Ruby on Rails framework), Rust, Scala, and Scheme.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Microsoft Edge',
    developer: 'Microsoft',
    description:
      'Microsoft Edge is a cross-platform web browser created and developed by Microsoft. Edge was initially built with Microsoft's own proprietary browser engine EdgeHTML and their Chakra JavaScript engine, a version now referred to as Microsoft Edge Legacy.[12] In 2019, Microsoft announced plans to rebuild the browser as Chromium-based[13][14] with Blink and V8 engines.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Gmail',
    developer: 'Google',
    description:
      'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide.[1] A user typically accesses Gmail in a web browser or the official mobile app. Google also supports the use of email clients via the POP and IMAP protocols. Today, the service comes with 15 gigabytes of storage. Users can receive emails up to 50 megabytes in size, including attachments, while they can send emails up to 25 megabytes.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Github',
    developer: 'Microsoft',
    description:
      'GitHub, Inc. is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, plus its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, continuous integration and wikis for every project.[4] Headquartered in California, it has been a subsidiary of Microsoft since 2018.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Docs',
    developer: 'Google',
    description:
      "Google Docs is Google's browser-based word processor. You can create, edit, and share documents online and access them from any computer with an internet connection",
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Drive',
    developer: 'Google',
    description:
      "Google Drive is a file storage and synchronization service developed by Google. Launched on April 24, 2012, Google Drive allows users to store files in the cloud (on Google's servers), synchronize files across devices, and share files. In addition to a web interface, Google Drive offers apps with offline capabilities for Windows and macOS computers, and Android and iOS smartphones and tablets. Google Drive encompasses Google Docs, Google Sheets, and Google Slides, which are a part of the Google Docs Editors office suite that permits collaborative editing of documents, spreadsheets, presentations, drawings, forms, and more. Files created and edited through the Google Docs suite are saved in Google Drive.",
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Maps',
    developer: 'Google',
    description:
      'Google Maps is a web mapping platform and consumer application offered by Google. It offers satellite imagery, aerial photography, street maps, 360° interactive panoramic views of streets, real-time traffic conditions, and route planning for traveling by foot, car, air and public transportation.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Photos',
    developer: 'Google',
    description:
      "Google Photos is a photo sharing and storage service developed by Google. It was announced in May 2015 and spun off from Google+, the company's former social network. The service automatically analyzes photos, identifying various visual features and subjects. Users can search for anything in photos, with the service returning results from three major categories: People, Places, and Things.",
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Google Slides',
    developer: 'Google',
    description:
      "Google Slides is a presentation program included as part of the free, web-based Google Docs Editors suite offered by Google. The service also includes Google Docs, Google Sheets, Google Drawings, Google Forms, Google Sites, and Google Keep. Google Slides is available as a web application, mobile app for Android, iOS, Windows, BlackBerry, and as a desktop application on Google's Chrome OS. The app allows users to create and edit files online while collaborating with other users in real-time.",
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Microsoft Teams',
    developer: 'Microsoft',
    description:
      'Microsoft Teams is a proprietary business communication platform developed by Microsoft, as part of the Microsoft 365 family of products. Teams primarily competes with the similar service Slack, offering workspace chat and videoconferencing, file storage, and application integration.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Discord',
    developer: 'Discord Inc.',
    description:
      'Discord is a VoIP, instant messaging and digital distribution platform designed for creating communities. Users communicate with voice calls, video calls, text messaging, media and files in private chats or as part of communities called "servers".[note 1] Servers are a collection of persistent chat rooms and voice chat channels. Discord runs on Windows, macOS, Android, iOS, iPadOS, Linux, and in web browsers.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Microsoft Word',
    developer: 'Microsoft',
    description:
      'Microsoft Word is a word processor developed by Microsoft. Microsoft Word is a component of the Microsoft Office suite of productivity software, but can also be purchased as a stand-alone product. Microsoft Word was initially launched in 1983, and has since been revised numerous times. It is available for both Windows and Apple operating systems.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Twitter',
    developer: 'Twitter Inc.',
    description:
      'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets". Registered users can post, like, and retweet tweets, but unregistered users can only read them. Users access Twitter through its website interface or its mobile-device application software',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Facebook',
    developer: 'Facebook Inc.',
    description:
      'Facebook is an American online social media and social networking service owned by Facebook, Inc.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    name: 'Slack',
    developer: 'Slack Technologies',
    description:
      'Slack is a proprietary business communication platform developed by American software company Slack Technologies. Slack offers many IRC-style features, including persistent chat rooms organized by topic, private groups, and direct messaging.',
    average_rating: 0,
    total_reviews: 0,
    stars_count: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
];
*/

export const db = new Database();
