class Students{
    name:string;
    age:number;
    gender:string;
    nationality:string;
    constructor(name:string,age:number,gender:string,nationality:string){
        this.name = name;
        this.age = age;
        this.gender = 'female';
        this.nationality = nationality;
    }

    getNationality(){
        return this.nationality;
    }
}

class Undergraduates extends Students implements Iundergrad{
    GPA:number;
    constructor(name:string,age:number,gender:string,nationality:string,GPA:number){
        super(name,age,gender,nationality);
        this.GPA = GPA;
    }
}

interface Iundergrad{
    name:String;
    age:number;
    gender:String;
    nationality:String;
    GPA:number;
}

let newUndergrate = new Undergraduates('Stephen',23,'male','Canada',4.0);
console.log(`nationality: ${newUndergrate.getNationality()}`);