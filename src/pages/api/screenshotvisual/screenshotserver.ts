import db, { storage } from '@/configs/firebase';
import { getDateCurrent } from '@/utils/getDateCurrent';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer, { Page } from 'puppeteer';

type ResponseData = {
  data?: string;
  message: any;
  url?: string;
};

const projectCollection = 'projects';
const projectsCollectionRef = collection(db, projectCollection);

const pageSnapShotCollection = 'pageSnapShot';
const pageSnapShotCollectionRef = collection(db, pageSnapShotCollection);

const pageVisualSnapShotCollection = 'pageVisualSnapShot';
const pageVisualSnapShotCollectionRef = collection(
  db,
  pageVisualSnapShotCollection
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { url } = req.body;

  if (!url) {
    res.status(400).json({ message: 'URL parameter is required' });
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await autoScroll(page);
    const screenshot = await page.screenshot({ type: 'png', fullPage: true });

    const screenshotName = `screenshot-${Date.now()}.png`;

    const screenshotRef = ref(storage, `screenshots/${screenshotName}`);
    const metadata = {
      contentType: 'image/png',
    };

    // Upload the file and metadata
    const snapshot = await uploadBytes(screenshotRef, screenshot);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const pageSnapshotUpdateData = {
      path: downloadURL,
      updateAt: getDateCurrent(),
      url: url,
    };

    const testworkerCollectionRef = collection(db, 'testworker');
    const projectRef = await addDoc(
      testworkerCollectionRef,
      pageSnapshotUpdateData
    );

    res.status(200).json({
      message: 'Screenshot taken and uploaded successfully',
      url: downloadURL,
    });
  } catch (error) {
    res.status(200).json({ message: error });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
