import { useNotification } from '@/hooks/useNotification';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import iconError from './assets/error.svg';
import iconInfor from './assets/infor.svg';
import iconSuccess from './assets/success.svg';
import iconWarning from './assets/warning.svg';
import {
	ContentWrapper,
	Description,
	Icon,
	NotificationWrapper,
} from './styles';

type OptionNotification = {
	title: string;
	icon: string;
};

export const Notification: FC = () => {
	const { t } = useTranslation();
	const { notification, setNotification } = useNotification();

	const handleImage: OptionNotification | undefined = useMemo(() => {
		if (notification?.type) {
			switch (notification.type) {
				case 'success': {
					return {
						title: t('Information.success'),
						icon: iconSuccess.src,
					};
				}

				case 'warning': {
					return {
						title: t('Information.warning'),
						icon: iconWarning.src,
					};
				}

				case 'infor': {
					return {
						title: t('Information.infor'),
						icon: iconInfor.src,
					};
				}

				case 'error': {
					return {
						title: t('Information.error'),
						icon: iconError.src,
					};
				}

				default: {
					return undefined;
				}
			}
		}
	}, [notification, t]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotification(null);
		}, 5000);

		return () => clearTimeout(timer);
	}, [notification, setNotification]);

	return notification?.type && handleImage && notification.message ? (
		<NotificationWrapper
			$menuVisible={true}
			type={notification.type}
			$menuTop={true}
		>
			<Icon src={handleImage.icon} />

			<ContentWrapper>
				<Description>{notification.message}</Description>
			</ContentWrapper>
		</NotificationWrapper>
	) : null;
};

Notification.displayName = 'Notification';
