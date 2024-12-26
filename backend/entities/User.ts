export class User {
    id: number;
    username: string;
    email: string;
    // ...autres propriétés de l'utilisateur...

    constructor(id: number, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        // ...initialisation des autres propriétés...
    }

    // ...méthodes pour gérer les informations de l'utilisateur...
}
