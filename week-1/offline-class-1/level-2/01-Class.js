
class Animal {
  constructor(name, legCount) {
    this.name = name
    this.legCount = legCount
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`
  }
}

const cat = new Animal('max', 4);
console.log(cat.describe());

const dog = new Animal('Tom', 4);
console.log(dog.describe());

const parrot = new Animal('Kite', 2);
console.log(parrot.describe());