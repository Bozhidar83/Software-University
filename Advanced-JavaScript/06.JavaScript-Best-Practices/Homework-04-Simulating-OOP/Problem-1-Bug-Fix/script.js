function Person(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;

    return {
        firstName: this._firstName,
        lastName: this._lastName,
        name: this._firstName + " " + this._lastName
    };
}

var peter = new Person("Peter", "Jackson");
console.log(peter.name);
console.log(peter.firstName);
console.log(peter.lastName);
