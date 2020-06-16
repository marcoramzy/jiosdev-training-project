export interface TokenData {
    expiry_date ?: Date;
    refresh_token: string;
    access_token: string;
    expires_in: number;
}
