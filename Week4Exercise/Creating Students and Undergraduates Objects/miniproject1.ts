class Students{
    name:string;
    age:number;
    gender:string;
    nationality:string;
    constructor(name:string,age:number,nationality:string){
        this.name = name;
        this.age = age;
        this.gender = 'female';//as requested 
        this.nationality = nationality;
    }

    getNationality(){
        return this.nationality;
    }

    getGender(){
        return this.gender;
    }
}

class Undergraduates extends Students implements Iundergrad{
    GPA:number;
    constructor(name:string,age:number,nationality:string,GPA:number){
        super(name,age,nationality);
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

let newUndergrate = new Undergraduates('Stephen',23,'Canada',4.0);
console.log(`nationality: ${newUndergrate.getNationality()}`);
console.log(`gender: ${newUndergrate.getGender()}`);