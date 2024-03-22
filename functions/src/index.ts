import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
import {
  Page,
  PageSnapshotQueueDoc,
  Project,
  ProjectSnapshot,
  SnapshotQueueDoc,
} from './models/Project';

admin.initializeApp(functions.config().firebase);
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '512MB',
};

export const processSnapshotQueue = functions.firestore
  .document('snapshotQueue/{id}')
  .onCreate(async (snap, context) => {
    const job = snap.data() as SnapshotQueueDoc;
    const projectRef = admin
      .firestore()
      .doc(`/users/${job.userId}/projects/${job.projectId}`);
    const project = (await projectRef.get()).data() as Project;
    const pagesRef = projectRef.collection('pages');
    const docs = await pagesRef.listDocuments();
    const snapshotsRef = projectRef.collection('snapshots');
    const snapshotData: ProjectSnapshot = {
      createdAt: Date.now(),
    };
    const snapshot = await snapshotsRef.add(snapshotData);
    for (const doc of docs) {
      const page = (await doc.get()).data() as Page;
      const pageSnapshotData: PageSnapshotQueueDoc = {
        userId: job.userId,
        projectId: page.projectId,
        pageId: doc.id,
        baseUrl: project.baseUrl,
        path: page.path,
        snapshotId: snapshot.id,
        createdAt: Date.now(),
      };

      await admin
        .firestore()
        .collection('/pageSnasphotQueue')
        .add(pageSnapshotData);
    }
    await admin.firestore().doc(`snapshotQueue/${snap.id}`).delete();
  });

export const processPageSnapshotQueue = functions
  .runWith(runtimeOpts)
  .firestore.document('pageSnapshotQueue/{id}')
  .onCreate(async (snap, context) => {
    const job = snap.data() as PageSnapshotQueueDoc;

    const isDebug = process.env.NODE_ENV !== 'production';

    const browser = await puppeteer.launch({
      headless: isDebug ? false : true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
      ],
    });

    const page = await browser.newPage();
    await page.goto(`${job.baseUrl}${job.path}`, {
      waitUntil: 'networkidle2',
    });
  });
