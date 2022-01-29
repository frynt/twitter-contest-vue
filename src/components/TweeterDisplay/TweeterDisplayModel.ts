export interface TweeterDisplayModel {
    user: {
        id: string;
        name: string;
        profilePictureURL: string;
    };
    likes: number | null;
    isSuccess: boolean;
    hasResponse: boolean;
}