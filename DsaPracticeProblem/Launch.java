class Animal{
    public void eat(){
        System.out.println("Animal is eating");
    }
    public void sleep(){
        System.out.println("Animal is sleeping");
    }
    public void foodHabit(){
        System.out.println("Animal has food-habit");
    }
}

class Deer extends Animal {
    public void eat() {
        System.out.println("Deer eats grass.");
    }

    public void sleep() {
        System.out.println("Deer sleeps in the wild.");
    }

    public void foodHabit() {
        System.out.println("Deer is a herbivore.");
    }
}
class Tiger extends Animal {
    public void eat() {
        System.out.println("Tiger eats meat.");
    }

    public void sleep() {
        System.out.println("Tiger sleeps in the jungle.");
    }

    public void foodHabit() {
        System.out.println("Tiger is a carnivore.");
    }
}
class Monkey extends Animal {
    public void eat() {
        System.out.println("Monkey eats fruits.");
    }

    public void sleep() {
        System.out.println("Monkey sleeps on trees.");
    }

    public void foodHabit() {
        System.out.println("Monkey is an omnivore.");
    }
}
class Forest {
    public void observe(Animal ref) {
        ref.eat();
        ref.sleep();
        ref.foodHabit();
    }
}

public class Launch {
    public static void main(String[] args) {
        Deer d = new Deer();
        Tiger t = new Tiger();
        Monkey m = new Monkey();

        Forest f = new Forest();

        f.observe(d);
        f.observe(t);
        f.observe(m);
    }
}

