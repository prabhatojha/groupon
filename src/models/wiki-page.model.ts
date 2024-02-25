export class WikiPageModel {
    id: string;
    title: string;

    constructor(id: string, thumb: string) {
        this.id = id;
        this.title = thumb;
    }
}
