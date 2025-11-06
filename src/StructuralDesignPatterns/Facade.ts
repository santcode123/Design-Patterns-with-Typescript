// Facade design pattern hide the complexity of subsystems and use subsystems methods  and accomplish the task the client want to achieve.
// in this design pattern we are seperating implementation of some task using complex subsystems methods and classes


/**  Example: when you go the retaurant you order the food from menu and you get the delicious food after some time, 
 * you don't care about how the food is prepared

*/

// subsystem

class Kitchen {
    public prepareFood(orderId: number) {
        // take the orderId and prepare the food
    }

    public readyToServe(orderId: number) {
        // return the prepared order to waiter
        return true; // return true or false based on order status
    }
}

class Waiter {

    public takeOrder() {
        // listen the customer and write down all the dishes and place the order to kitchen chef
        const orderId = 34; // here order id hardcoded and later it can be made dynamic
        return orderId;
    }

    public serveTheOrder() {
        // serve the order back to customer
    }
}


class RestaurantFacade {
    private menu: string;
    protected kitchen: Kitchen; // subsystem 1
    protected waiter: Waiter;  // subsystem 2

    constructor({ menu, kitchen, waiter }: { menu: string; kitchen: Kitchen; waiter: Waiter }) {
        this.menu = menu;
        this.kitchen = kitchen;
        this.waiter = waiter;
    }


    public getMenu() {
        return this.menu;
    }

    public orderFood() {
        const restaurantKitchen = this.kitchen;
        const restaurantWaiter = this.waiter;

        const orderId = restaurantWaiter.takeOrder() // customer gives the order to waiter and waiter give token no(order number)
        restaurantKitchen.prepareFood(orderId); //  this prepareFood will take some time

        // keep checking whether food has prepared or not

        const isFoodPrepared = restaurantKitchen.readyToServe(orderId);

        if (isFoodPrepared) {
            const deliciousFood = restaurantWaiter.serveTheOrder();
            return deliciousFood;
        } else {
            return 'please wait we are preparing the food';
        }
    }
}


function clientCode() {
    const menu = 'Apple juice, panner sandwitch, roti... etc';
    const kitchen = new Kitchen();
    const waiter = new Waiter();

    const restorantFacade = new RestaurantFacade({ menu, kitchen, waiter });

    restorantFacade.orderFood(); // implementation of orderfood hidden from client how the subsytem are interacting,client does not care about that
}