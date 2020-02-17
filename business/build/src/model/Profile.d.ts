export interface Profile {
    _id: string;
    accountId: string;
    favoriteShoes: string[];
    ownedShoes: Array<{
        shoeId: string;
        owned: Array<{
            number: number;
            shoeSize: string;
        }>;
    }>;
    userProvidedName?: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    userProvidedAddress?: string;
    userProvidedGender?: string;
    userProvidedShoeSize?: string;
    userProvidedEmail?: string;
    userProvidedPhoneNumber?: string;
    userProvidedProfilePic?: string;
}
