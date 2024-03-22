import { useImageFile } from '@/components/pages/CompareImagePage/CompareImageDetail/imageFile.hooks';
import { INPUT_TYPE } from '@/types';
import { getWidth } from '@/utils/element';
import debounce from 'lodash/debounce';
import pixelMatch from 'pixelmatch';
import { useCallback, useEffect, useRef, useState } from 'react';

export type ComparePercentType = { diff: number; match: number };

const OFFSET_TIME = 200;
export const TOTAL_PERCENT = 100;

export const useCompareImage = (
  newestPageVisualSnapshotPath?: string,
  snapShotPath?: string
) => {
  const imageWrapperRef = useRef<HTMLTableCellElement>(null);
  const imageACanvasRef = useRef<HTMLCanvasElement>(null);
  const imageBCanvasRef = useRef<HTMLCanvasElement>(null);
  const diffRef = useRef<HTMLCanvasElement>(null);

  const [totalImagePixel, setTotalImagePixel] = useState(0);

  const [comparePercent, setComparePercent] = useState<ComparePercentType>({
    diff: 0,
    match: 0,
  });

  const [isElementUploaded, setIsElementUploaded] = useState({
    imageA: false,
    imageB: false,
  });

  const { data, isLoading } = useImageFile(
    newestPageVisualSnapshotPath,
    snapShotPath
  );

  const handleDetectCanvas = useCallback((type: INPUT_TYPE) => {
    return type === INPUT_TYPE.INPUT_A
      ? imageACanvasRef.current
      : imageBCanvasRef.current;
  }, []);

  const compareImages = useCallback(() => {
    const compareDebounce = debounce(() => {
      const canvasA = imageACanvasRef.current;
      const canvasB = imageBCanvasRef.current;
      const canvasDiff = diffRef.current;

      if (!canvasA || !canvasB || !canvasDiff) {
        return;
      }

      const firstImageContext = canvasA.getContext('2d');
      const secondImageContext = canvasB.getContext('2d');
      const diffImageContext = canvasDiff.getContext('2d');

      if (!firstImageContext || !secondImageContext || !diffImageContext) {
        return;
      }

      const { width: baseWidthA, height: baseHeightA } = canvasA;
      const { width: baseWidthB, height: baseHeightB } = canvasB;

      const baseHeight = baseHeightA > baseHeightB ? baseHeightA : baseHeightB;
      const baseWidth = baseWidthA || baseWidthB;
      canvasDiff.height = baseHeight;
      canvasDiff.width = baseWidth;

      const firstImage = firstImageContext.getImageData(
        0,
        0,
        baseWidth,
        baseHeight
      );

      const secondImage = secondImageContext.getImageData(
        0,
        0,
        baseWidth,
        baseHeight
      );

      const diff = diffImageContext.createImageData(baseWidth, baseHeight);

      const diffCount = pixelMatch(
        firstImage.data,
        secondImage.data,
        diff.data,
        baseWidth,
        baseHeight,
        { threshold: 0.2 }
      );

      const diffPercent = Number(
        ((diffCount / totalImagePixel) * TOTAL_PERCENT).toFixed(2)
      );

      const matchPercent = Number((TOTAL_PERCENT - diffPercent).toFixed(2));

      setComparePercent({
        diff: diffPercent,
        match: matchPercent,
      });
      diffImageContext.putImageData(diff, 0, 0);
    }, OFFSET_TIME);

    compareDebounce();
  }, [totalImagePixel]);

  const handleCompare = useCallback(
    (type: INPUT_TYPE) => {
      if (
        (type === INPUT_TYPE.INPUT_A && isElementUploaded.imageB) ||
        (type === INPUT_TYPE.INPUT_B && isElementUploaded.imageA)
      ) {
        compareImages();
      }

      setIsElementUploaded((prev) =>
        type === INPUT_TYPE.INPUT_A
          ? { ...prev, imageA: true }
          : { ...prev, imageB: true }
      );
    },
    [compareImages, isElementUploaded.imageA, isElementUploaded.imageB]
  );

  const handleUploadImage = useCallback(
    (type: INPUT_TYPE, file?: Blob) => {
      const image = new Image();

      const canvas = handleDetectCanvas(type);
      const imageWrapperWidth = getWidth(imageWrapperRef.current);

      if (!file) {
        return;
      }

      image.addEventListener('load', () => {
        if (canvas instanceof HTMLCanvasElement) {
          const imageNewHeight =
            (imageWrapperWidth * image.height) / image.width;

          canvas.width = imageWrapperWidth;
          canvas.height = imageNewHeight;
          canvas
            .getContext('2d')
            ?.drawImage(image, 0, 0, imageWrapperWidth, imageNewHeight);

          setTotalImagePixel((prev) => {
            const currentImagePixel = imageWrapperWidth * imageNewHeight;
            const previousImagePixel = prev;

            return currentImagePixel > previousImagePixel
              ? currentImagePixel
              : previousImagePixel;
          });
        }
      });

      image.src = URL.createObjectURL(file);
      handleCompare(type);
    },
    [handleDetectCanvas, handleCompare]
  );

  const handleImages = useCallback(() => {
    if (!data) {
      return;
    }

    const { baseImage, compareImage } = data;

    if (!baseImage || !compareImage) {
      return;
    }

    handleUploadImage(INPUT_TYPE.INPUT_B, baseImage);
    handleUploadImage(INPUT_TYPE.INPUT_A, compareImage);
  }, [data, handleUploadImage]);

  useEffect(() => {
    handleImages();
  }, [handleImages]);

  return {
    isElementUploaded,
    imageACanvasRef,
    imageBCanvasRef,
    imageWrapperRef,
    comparePercent,
    diffCount: comparePercent.diff,
    isLoading,
    diffRef,
  };
};
