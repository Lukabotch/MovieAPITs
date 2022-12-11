export interface Movie{
    Country: string,
    Poster: string,
    Title: string,
    Year: any,
    Actors:string
    
}
export interface Runtime{
    Runtime: string,
    Country:string
}
export interface Population{
    population: number,
    
}
export interface Flags{
    name: Common,
    currencies: string,
    flags: PNG
}
interface Common{
    common:string
}
interface PNG{
    svg:string
}
