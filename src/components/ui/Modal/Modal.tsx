import { useClickOutside } from '@/utils/clickOutside';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseImage from './assets/close.svg';
import {
  ChildrenWrapper,
  CloseIcon,
  ModalContainer,
  ModalTitle,
  ModalWrapper,
  SubTitle,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  $isModalNotAlignCenter?: boolean;
  isAllowClickOutsideToClose?: boolean;
  subTitle?: string;
  widthModal?: string;
};

const handleHeightStringToNumber = (height: string) =>
  Number(height.replace('px', ''));

// Modal components
export const Modal: FC<Props> = memo(
  ({
    open,
    onClose,
    children,
    title,
    $isModalNotAlignCenter,
    isAllowClickOutsideToClose = true,
    subTitle,
    widthModal,
  }) => {
    const ref = useRef(null);

    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useClickOutside(ref, () => isAllowClickOutsideToClose && onClose());

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onClose();
        }
      },
      [onClose, open]
    );

    const handleMeasureRef = (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }

      const { height } = getComputedStyle(node);
      setHeaderHeight(handleHeightStringToNumber(height));
    };

    useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : 'auto';
    }, [open]);

    useEffect(() => {
      document.addEventListener('keydown', (event) => handleKeyDown(event));
      return document.removeEventListener('keydown', (event) =>
        handleKeyDown(event)
      );
    }, [handleKeyDown]);

    return open ? (
      <ModalWrapper
        $isOpen={open}
        $isModalNotAlignCenter={$isModalNotAlignCenter}
      >
        <ModalContainer ref={ref} $isOpen={open} width={widthModal}>
          <CloseIcon onClick={onClose} src={CloseImage.src} />
          {title && (
            <ModalTitle ref={handleMeasureRef}>
              {title}
              {subTitle && <SubTitle>{subTitle}</SubTitle>}
            </ModalTitle>
          )}

          <ChildrenWrapper $headerHeight={headerHeight}>
            {children}
          </ChildrenWrapper>
        </ModalContainer>
      </ModalWrapper>
    ) : null;
  }
);

Modal.displayName = 'Modal';
