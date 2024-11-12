const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Coupe Maserati',
            imgSrc: '../img/black-convertible-coupe.jpg',
        },
        {
            clickCount: 0,
            name: 'Camaro SS 1LE',
            imgSrc: '../img/chevrolet-camaro.jpg',
        },
        {
            clickCount: 0,
            name: 'Dodger Charger 1970',
            imgSrc: '../img/dodge-charger.jpg',
        },
        {
            clickCount: 0,
            name: 'Ford Mustang 1966',
            imgSrc: '../img/ford-mustang.jpg',
        },
        {
            clickCount: 0,
            name: '190 SL Roadster 1962',
            imgSrc: '../img/mercedes-benz.jpg',
        },
    ],
};

const controller = {
    init() {
        // set our current car to the first one in the list
        model.currentCar = model.cars[0];

        view.carList.init();
        view.car.init();
    },

    getCurrentCar() {
        return model.currentCar;
    },

    getCars() {
        return model.cars;
    },

    // set the currently-selected car to the object passed in
    setCurrentCar(car) {
        model.currentCar = car;
    },

    // increments the counter for the currently-selected car
    incrementCounter() {
        model.currentCar.clickCount++;
        view.car.render();
    },
};

const view = {
    car: {
        init() {
            // store pointer to our DOM elements for easy access later
            this.carElem = document.querySelector('#car');
            this.carNameElem = document.querySelector('#car-name');
            this.carImageElem = document.querySelector('#car-img');
            this.countElem = document.querySelector('#car-count');

            // on click increment the current car's counter
            this.carImageElem.addEventListener('click', this.clickHandler);

            // render this view (update the DOM elements with the right values)
            this.render();
        },
        clickHandler() {
            return controller.incrementCounter();
        },
        render() {
            // update the DOM elements with values from the current car
            const currentCar = controller.getCurrentCar();
            this.countElem.textContent = currentCar.clickCount;
            this.carNameElem.textContent = currentCar.name;
            this.carImageElem.src = currentCar.imgSrc;
            this.carImageElem.style.cursor = 'pointer';
        }
    },
    carList: {
        init() {
            // store the DOM element for easy access later
            this.carListElem = document.querySelector('#car-list');

            // render this view (update the DOM elements with the right values)
            this.render();
        },
        render() {
            let elem;

            // get the cars we'll be rendering from the controller
            const cars = controller.getCars();

            // empty the car list
            this.carListElem.innerHTML = '';

            for (const car of cars) {

                // make a new car list item and set its text
                elem = document.createElement('li');
                elem.style.cursor = 'pointer';
                elem.textContent = car.name;
                elem.addEventListener(
                    'click',
                    (function(carCopy) {
                        return function() {
                            controller.setCurrentCar(carCopy);
                            view.car.render();
                        };
                    })(car)
                );
                // finally, add the element to the list
                this.carListElem.appendChild(elem);
            }
        }
    }
}

controller.init();