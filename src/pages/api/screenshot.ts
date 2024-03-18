import db, { storage } from '@/configs/firebase';
import { getDateCurrent } from '@/utils/getDateCurrent';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
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

	const { url, project, pageSnapShot, isCheckVisual } = req.body;

	if (!url || !project || !pageSnapShot) {
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
		if (
			project.hasBasicAuth &&
			project.userNameBasicAuth &&
			project.passwordBasicAuth
		) {
			await page.authenticate({
				username: project.userNameBasicAuth,
				password: project.passwordBasicAuth,
			});
		}
		await page.setViewport({ width: 1920, height: 1080 });
		if (
			project.urlLogin &&
			project.userNameLogin &&
			project.passwordLogin &&
			pageSnapShot.isPagePrivate
		) {
			await page.goto(project.urlLogin, { waitUntil: 'networkidle2' });
			await page.type('input[type="email"]', project.userNameLogin);
			await page.type('input[type="text"]', project.userNameLogin);
			await page.type('input[type="password"]', project.passwordLogin);
			await page.keyboard.press('Enter', { delay: 2000 });
		}
		await page.goto(url, { waitUntil: 'networkidle2' });
		await autoScroll(page);
		const screenshot = await page.screenshot({ type: 'png', fullPage: true });

		const screenshotName = `screenshot-${Date.now()}.png`;

		const screenshotRef = ref(
			storage,
			`screenshots/${project.id}/${screenshotName}`
		);
		const metadata = {
			contentType: 'image/png',
		};

		// Upload the file and metadata
		const snapshot = await uploadBytes(screenshotRef, screenshot);
		const downloadURL = await getDownloadURL(snapshot.ref);
		if (!isCheckVisual) {
			const pageSnapshotUpdateData = {
				path: downloadURL,
				updateAt: getDateCurrent(),
			};
			const getDocPageSnapShot = doc(
				db,
				projectCollection,
				project.id,
				pageSnapShotCollection,
				pageSnapShot.id
			);
			const pageSnapShotRef = await updateDoc(getDocPageSnapShot, {
				...pageSnapshotUpdateData,
			});
		}

		if (isCheckVisual) {
			const dataVisualCheck = {
				reference: false,
				status: true,
				path: downloadURL,
				updateAt: getDateCurrent(),
			};
			const getDocVisualCheck = collection(
				db,
				projectCollection,
				project.id,
				pageSnapShotCollection,
				pageSnapShot.id,
				pageVisualSnapShotCollection
			);
			const visualCheckRef = await addDoc(getDocVisualCheck, dataVisualCheck);
		}
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
