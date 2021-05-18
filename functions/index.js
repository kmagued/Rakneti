const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {CloudTasksClient} = require('@google-cloud/tasks');
admin.initializeApp({
  databaseURL: 'https://rakneti-default-rtdb.europe-west1.firebasedatabase.app',
});

exports.onCreateReservation = functions.database
  .ref('/reservations/{id}')
  .onCreate(async (snapshot) => {
    const project = 'rakneti';
    const location = 'us-central1';
    const queue = 'cancel';

    const userId = snapshot.key;
    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(project, location, queue);
    const expirationAtSeconds = Date.now() + 1000;

    const url = `https://${location}-${project}.cloudfunctions.net/cancelReservation`;
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: JSON.stringify({id: userId}),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      scheduleTime: {
        expirationAtSeconds,
      },
    };

    await tasksClient.createTask({
      parent: queuePath,
      task,
    });
  });

exports.cancelReservation = functions.https.onRequest(async (req, res) => {
  const {id} = req.body;

  try {
    await admin.database().ref(`/reservations/${id}`).remove();
    res.send(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
