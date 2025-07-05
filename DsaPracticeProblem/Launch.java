abstract class Car {
    public void start() {
        System.out.println("Car is starting...");
    }

    abstract public void accelerate();
    abstract public void drive();
    abstract public void combustion();

    public void stop() {
        System.out.println("Car is stopping...");
    }
}

class Maruti800 extends Car {
    public void accelerate() {
        System.out.println("Maruti800 is accelerating at a normal pace.");
    }

    public void drive() {
        System.out.println("Maruti800 is driving smoothly.");
    }

    public void combustion() {
        System.out.println("Maruti800 uses petrol combustion engine.");
    }
}

class Innova extends Car {
    public void accelerate() {
        System.out.println("Innova is accelerating moderately.");
    }

    public void drive() {
        System.out.println("Innova is driving with comfort.");
    }

    public void combustion() {
        System.out.println("Innova uses diesel combustion engine.");
    }
}

class Ferrari extends Car {
    public void accelerate() {
        System.out.println("Ferrari is accelerating rapidly!");
    }

    public void drive() {
        System.out.println("Ferrari is driving at high speed.");
    }

    public void combustion() {
        System.out.println("Ferrari uses high-performance combustion engine.");
    }
}
class Road{
    public void permit(Car ref){
        ref.start();
        ref.accelerate();
        ref.drive();
        ref.combustion();
        ref.stop();
    }
}
public class Launch {
    public static void main(String[] args) {
        Car m = new Maruti800();
        Car i = new Innova();
        Car f = new Ferrari();

        Road r=new Road();
        r.permit(f);
        r.permit(m);
        r.permit(i);
      
    }
}
