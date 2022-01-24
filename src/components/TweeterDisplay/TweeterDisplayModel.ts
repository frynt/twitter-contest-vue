export interface TweeterDisplayModel {
    user: {
        name: string;
        profileImageURL: string;
    };
    likes: number;
    isSuccess: boolean;
    hasResponse: boolean;
}