import styled, { css } from 'styled-components';

export const LoadingComponent = styled.div<{
	isComponentLoading?: boolean;
	heightNumber?: string;
}>`
	display: flex;
	align-items: center;
	${({ isComponentLoading, heightNumber }) =>
		isComponentLoading &&
		css`
			justify-content: center;
			height: ${heightNumber};
			width: 100%;
		`}
`;

export const LoadingWrapper = styled.div`
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	border: 4px solid ${({ theme }) => theme.colors.primary_0};
	border-radius: 50%;
	border-top: 4px solid ${({ theme }) => theme.colors.primary};
	width: 25px;
	height: 25px;
	margin-right: 10px;
	animation: spin 2s linear infinite;
`;
