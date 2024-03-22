import { convertFileToArrayBuffer } from '@/utils/file';
import sharp from 'sharp';

export const useSharpImage = () => {
  const handleResize = async (image: File, width: number, height?: number) => {
    const imageBuffer = await convertFileToArrayBuffer(image);

    const resizedImage = await sharp(imageBuffer)
      .resize(width, height, {
        fit: 'inside',
      })
      .webp({ quality: 100 })
      .toBuffer();

    return resizedImage;
  };

  return { handleResize };
};
