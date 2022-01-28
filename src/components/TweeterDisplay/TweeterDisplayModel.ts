export interface TweeterDisplayModel {
    user: {
        name: string;
        profilePictureURL: string;
    };
    likes: number | null;
    isSuccess: boolean;
    hasResponse: boolean;
}