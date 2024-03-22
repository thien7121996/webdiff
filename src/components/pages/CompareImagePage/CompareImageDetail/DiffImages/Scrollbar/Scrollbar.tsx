'use client';

import { getCoords, getHeight } from '@/utils/element';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollbarThumb, ScrollbarWrapper } from './styles';

const handleCalcTrackCurrentY = (scrollbarTrack: HTMLDivElement | null) => {
	if (!scrollbarTrack) {
		return 0;
	}

	const computedStyle = window.getComputedStyle(scrollbarTrack);
	const transformMatrix = new DOMMatrix(computedStyle.transform);
	const translateYValue = transformMatrix.m42;

	return translateYValue;
};

export const Scrollbar = () => {
	const isDownRef = useRef(false);
	const trackYPrevious = useRef(0);
	const scrollbarRef = useRef<HTMLDivElement>(null);
	const scrollbarTrackRef = useRef<HTMLDivElement>(null);

	const [trackY, setTrackY] = useState(0);

	const handleMouseDown = () => {
		isDownRef.current = true;
	};

	const scrollbar = useMemo(() => ({ top: 0 }), []);

	const handleGetScrollbarTop = useCallback(
		(scrollbarTrackElement: HTMLElement | null) => {
			if (!scrollbarTrackElement) {
				return 0;
			}

			if (!scrollbar.top) {
				const scrollbarTop = getCoords(scrollbarTrackElement)?.top ?? 0;
				scrollbar.top = scrollbarTop;
				return scrollbarTop;
			}

			return scrollbar.top;
		},
		[scrollbar]
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			const currentMouseY = event.pageY;
			const scrollBar = scrollbarRef.current;
			const scrollbarTop = handleGetScrollbarTop(scrollBar);
			const trackHeight = getHeight(scrollbarTrackRef.current);

			if (!isDownRef.current || !scrollBar) {
				return;
			}

			const translateYValue = currentMouseY - scrollbarTop;

			if (
				translateYValue < 0 ||
				translateYValue > scrollBar.offsetHeight - trackHeight
			) {
				return;
			}

			setTrackY(translateYValue);
		},
		[handleGetScrollbarTop]
	);

	const handleMouseUp = (event: MouseEvent) => {
		if (isDownRef.current) {
			isDownRef.current = false;
			trackYPrevious.current = event.pageY;
		}
	};

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [handleMouseMove]);

	return (
		<ScrollbarWrapper className="bg-slate-700" ref={scrollbarRef}>
			<ScrollbarThumb
				style={{ transform: `translateY(${trackY}px)` }}
				draggable={false}
				ref={scrollbarTrackRef}
				onMouseDown={handleMouseDown}
				height={100}
			/>
		</ScrollbarWrapper>
	);
};
