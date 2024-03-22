import { styled } from 'styled-components';

export const ScrollbarWrapper = styled.div`
	position: relative;
	height: 600px;
`;

export const ScrollbarThumb = styled.div<{
	height: number;
}>`
	height: ${({ height }) => `${height}px`};
	background-color: grey;
	position: absolute;
	width: 100%;
	opacity: 0.4;

	&:hover {
		opacity: 0.6;
	}
`;
