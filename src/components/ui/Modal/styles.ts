import { theme } from '@/configs/theme';
import { MEDIA_QUERY } from '@/utils/screenSize';
import styled, { css } from 'styled-components';
export const scrollTrack = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary_300};
    border-radius: 10px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.background_200};
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.secondary_300};
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.background_200};
    }
  }
`;

export const ModalWrapper = styled.div<{
  isModalNotAlignCenter?: boolean;
  $isOpen?: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: ${({ isModalNotAlignCenter }) =>
    !isModalNotAlignCenter && 'center'};
  align-items: center;
  background: ${theme.colors.overlay};
  backdrop-filter: blur(3px);
  z-index: ${theme.zIndex.modal};
  color: ${theme.colors.secondary_900};
`;

export const ChildrenWrapper = styled.div<{ $headerHeight?: number }>`
  position: relative;
  padding: 0px;
  width: 100%;
  height: 100%;

  ${scrollTrack}

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    figure {
      width: 900px;
    }
    height: ${({ $headerHeight }) =>
      $headerHeight ? `calc(100% - ${$headerHeight + 5}px)` : '100%'};
    overflow-x: scroll;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    figure {
      width: 550px;
    }
    padding: 0 15px 0 15px;
    height: ${({ $headerHeight }) =>
      $headerHeight ? `calc(100% - ${$headerHeight}px)` : '100%'};
  }
`;

export const ModalContainer = styled.div<{ $isOpen?: boolean; width?: string }>`
  position: relative;
  max-height: 100%;
  width: ${({ width }) => width ?? '900px'};
  background: ${theme.colors.primary_0};
  border-radius: 8px;
  opacity: 1;
  transition: all 0.2s ease-out;
  max-width: 80%;

  @media (max-width: ${MEDIA_QUERY.SMALL_LAPTOP}) {
    min-width: auto;
    width: 80%;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    min-width: auto;
    max-width: 90%;
    width: 90%;
    padding: 20px 0 20px 0;
  }

  ${({ $isOpen }) => {
    if ($isOpen) {
      return css`
        animation: open 0.5s;
        transition: all 0.5s ease-out;
        @keyframes open {
          0% {
            transform: scale(0, 0);
          }
          100% {
            transform: scale(1);
          }
        }
      `;
    }
  }};
`;

export const CloseIcon = styled.img`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 9;

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    min-width: auto;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  padding-bottom: 40px;
  padding-right: 40px;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    padding-right: 15px;
    font-size: 20px;
  }
`;

export const SubTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  margin: 0px;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    font-size: 24px;
  }
`;
