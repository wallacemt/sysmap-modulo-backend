// TypeScript tem tipagem estatica.
let a: number = 1;
console.log(a); // number

// Tipos básicos
let isDone: boolean = false; // boolean
let decimal: number = 6; // number
let color: string = "blue"; // string

// Arrays
let list: number[] = [1, 2, 3]; // Array de números
let listGeneric: Array<number> = [1, 2, 3]; // Array de números usando generics

// Tuple
let x: [string, number];
x = ["hello", 10]; // Tuple

// Enum
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green; // Enum

// Any
let notSure: any = 4;
notSure = "maybe a string instead"; // Any

// Void
function warnUser(): void {
    console.log("This is my warning message");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}

// Definindo tipos especificos
type Pessoa = {
    nome: string;
    idade: number;
}

const person: Pessoa = {
    nome: 'joao',
    idade: 20
};

console.log(person); // { nome: string, idade: number }

