class Plane{
    public void takeOff(){
        System.out.println("Plane is taking off..");
    }
    public void fly(){
        System.out.println("Plane is flying");

    }
    public void land(){
        System.out.println("Plane is landing");
    }
}

class CargoPlane extends Plane{
    public void takeOff(){
        System.out.println("CargoPlane is taking-off form a long-sized runway");
    }
    public void fly(){
        System.out.println("Cargoplane is flying at lower height");
    }
    public void land(){
        System.out.println("CargoPlane is landing on long-sized runway");
    }
}
class PassengerPlane extends Plane{
    public void takeOff(){
        System.out.println("CargoPlane is taking-off form a medium-sized runway");
    }
    public void fly(){
        System.out.println("Cargoplane is flying at medium height");
    }
    public void land(){
        System.out.println("CargoPlane is landing on medium-sized runway");
    }
}
class FighterPlane extends Plane{
    public void takeOff(){
        System.out.println("CargoPlane is taking-off form a small-sized runway");
    }
    public void fly(){
        System.out.println("Cargoplane is flying at small height");
    }
    public void land(){
        System.out.println("CargoPlane is landing on small-sized runway");
    }
}