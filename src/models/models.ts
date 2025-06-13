export interface LoginOptions {
    name: string,
    id: number,
    // logo URL
    logo: string,
}

export interface tagType {
    name: string,
    count: number,
}

export interface passwordItemType {
    id: number,
    title: string,
    remark: string,
    username: string,
    password: string,
    website: string,
    tags: string[],
    star: boolean,
}

export interface favoriteItemType {
    id: number,
    username: string,
    title: string,
}