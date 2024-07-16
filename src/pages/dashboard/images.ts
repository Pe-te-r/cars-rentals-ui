const images = [
    'https://media.istockphoto.com/id/185257478/photo/suv-car-in-studio-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=rKbkAh3XjIqLlgiOFYrc0Dq4d8K5-Df8ylk6JorCVsk=',
    'https://media.istockphoto.com/id/185257478/photo/suv-car-in-studio-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=rKbkAh3XjIqLlgiOFYrc0Dq4d8K5-Df8ylk6JorCVsk=',
    'https://media.istockphoto.com/id/498316477/photo/luxury-blue-sports-car.jpg?s=1024x1024&w=is&k=20&c=3E-eZfrsceRtFu0mes-OgFnbJNN28C4J_kHizPGeeME=',
    'https://media.istockphoto.com/id/485892256/photo/3d-sport-car-vehicle-transportation-illustration-concept.jpg?s=1024x1024&w=is&k=20&c=gebHpWjc5loBsZA2gQoSrqxq4kaWNYrUOKKvvlL-rUI=',
    'https://media.istockphoto.com/id/184931998/photo/hybrid-car-in-studio-isolated-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4aazVCuXNKILfTc_KnzDHorifeer0vOAIzikflNZOL4=',
    'https://i.pinimg.com/564x/72/2c/7b/722c7b2f02f906c72530f6c78d83f7fa.jpg',
    'https://i.pinimg.com/236x/4a/02/e2/4a02e21b10847447470f29e4093a2fba.jpg',
    'https://i.pinimg.com/236x/3b/eb/cb/3bebcb9c5a09caa7b1ffbc53adcc5f4c.jpg',
    'https://i.pinimg.com/236x/c2/10/6b/c2106b4181dfc52e7f98abf426adc2e1.jpg',
    'https://i.pinimg.com/236x/fe/ec/d8/feecd808aff8095c5ced0616ab77f96d.jpg',
    'https://i.pinimg.com/236x/95/69/d2/9569d2ee0ede39789b51a30f51c04d28.jpg',
    'https://i.pinimg.com/236x/20/06/b2/2006b27687c017606751129515472ac8.jpg',
    'https://i.pinimg.com/236x/1a/0c/54/1a0c54be1836211f71e4ea5f9bbc5395.jpg',
    'https://i.pinimg.com/564x/d7/3a/f8/d73af822e7ae484561635ad1550fd784.jpg'
]

let index = 0

export const getRandomImage=()=>{
    if(index > images.length) {
        index = 1
    }
    return images[index++];
    // const randomIndex = Math.floor(Math.random() * images.length);
    // return images[randomIndex];
}