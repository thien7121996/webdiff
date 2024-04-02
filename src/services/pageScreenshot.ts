import {
  ScreenshotPageRequest,
  ScreenshotPageResponse,
} from '@/models/GetScreenshotPage';
import { httpClient } from '@/utils/httpClient';

export const pageScreenshot = async (
  request: ScreenshotPageRequest
): Promise<ScreenshotPageResponse> => {
  return await httpClient.post('/page-screenshot', request);
};
