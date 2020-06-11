export interface PeopleData {
    Id ?: number;
    FullName ?: string;
    Name: {FirstName: string, SecondName: string};
    Mobile: number;
    Email: string;
    Birthdate: Date;
    PhotoFile: string;
    PhotoPath?: string;
    Gender: string;
}
