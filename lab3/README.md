# Lab 3 assignment:

## OOP JavaScript Todo app

* [Test the todo app](https://xh7gts.csb.app)
* [Link to codesandbox](https://codesandbox.io/s/cool-snow-xh7gts?file=/classes/App.js)

## ES2022 Feature: Private methods
Met ES6 is het mogelijk om object georiënteerd te programmeren. Hoewel het eerder syntactic sugar is en achterliggend nog steeds met functions werkt, is het toch een fijnere manier van werken. Sinds ik met php heb leren programmeren, embrace ik het gebruik van classes. In tegenstelling tot php was het tot voor de laatste ES release niet mogelijk om methods private te zetten. Als je een nieuw object instantieerde waren alle methodes dus aanspreekbaar buiten de klasse.

Nu is het dus mogelijk om methodes private te maken, waardoor we deze enkel binnen de klasse kunnen oproepen. Om een methode private te maken, gebruik je een `#` voor de naam van je methode.

Voorbeeld:
```JavaScript
class Person {
	constructor(firstname, lastname, age) {
	    this.firstname = firstname;
	    this.lastname = lastname;
	    this.age = age;
	}

    #fullName() {
		return `${this.firstname} ${this.lastname}`;
    }

	getAllInfo() {
		return  `${this.#fullName()} is ${this.age} years old.`;
	}
}

let  p1 = new  Person ('Peter', 'Seli', 23);
console.log(p1.getAllInfo()); //output: Peter Seli is 23 years old.
console.log(p1.fullName()); //TypeError: p1.fullName is not a function.
```
De klasse persoon krijgt 3 atributen; voornaam, achternaam en leeftijd. We willen een `fullName()` methode hebben die ervoor zorgt dat de voornaam en achternaam concateneert, maar deze kan  enkel binnen de klasse aangesproken worden. Buiten de klasse mag deze methode niet gekend zijn. We gebruiken dus de `#` om ervoor te zorgen dat deze methode private blijft.

De methode `getAllInfo()` zorgt ervoor dat alle info in een string getoond kan worden. Deze maakt gebruikt van de `#fullName()` methode. Dat kan omdat getAllInfo() binnen de klasse `Person` zit.

Buiten de klasse kan `getAllInfo()` aangesproken worden en krijg je de verwachte output. Als we de methode `fullName()` proberen aanspreken krijgen we een Error dat zegt dat `fullName()` geen functie is.
