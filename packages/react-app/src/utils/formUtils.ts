import activity, { CLIENT } from '@app/constants/activity';
import bountyStatus from '@app/constants/bountyStatus';
import { ActivityHistoryItem, DiscordBoardUser, StatusHistoryItem } from '@app/models/Bounty';
import { APIUser } from 'discord-api-types';

export const dateIsNotInPast = (d: string): string | boolean => {
	const dt = new Date(d).getTime();
	const today = new Date();
	const todayAtMidnight = today.setHours(0, 0, 0, 0);
	const validDate = (dt - todayAtMidnight) >= 0;
	return validDate ? true : 'Cannot set a date in the past';
};

export const validNonNegativeDecimal = (v: string): string | boolean => {
	/**
   * Passing decimals to form requires a conversion from a text input type to
   * a number
   */
	if (!Number(v)) return 'Not a valid reward';
	return Number(v) > 0 ? true : 'Must be > 0';
};

export const claimedBy = (user: APIUser): DiscordBoardUser => (
	{
		discordHandle: `${user?.username}#${user.discriminator}`,
		discordId: user?.id,
	}
);

export const newActivityHistory = (old: ActivityHistoryItem[]): ActivityHistoryItem[] => {
	const newActivity: ActivityHistoryItem = {
		modifiedAt: new Date().toISOString(),
		client: CLIENT.BOUNTYBOARD,
		activity: activity.CLAIM,
	};
	return [...old, newActivity];
};

export const newStatusHistory = (oldStatusHistory: StatusHistoryItem[]): StatusHistoryItem[] => {
	const newStatus: StatusHistoryItem = {
		modifiedAt: new Date().toISOString(),
		status: bountyStatus.IN_PROGRESS,
	};
	return [...oldStatusHistory, newStatus];
};

export const required = 'This field is required';
