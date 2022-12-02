import {actions, assign} from 'xstate';
import { ActorRefFrom } from "xstate";
import { createMachine, interpret } from 'xstate';


export const shoppingMachine  = 
/** @xstate-layout N4IgpgJg5mDOIC5SwBYHsAOGCWA7KABALYCGAxinmAHQYBOaEArmQC4CCEEAxPYy6wIkukANoAGALqJQGNLGytsaXDJAAPRAFoA7AGZqADgBM4vQEZjAVgA0IAJ7brANmo6rAXw93UmHPmJySlwaPmY2ACUwIjQAN0heBnDBOmi4sSk1OQUlFTVNBC1nY2pncXMrYtsHbXMATgN3L28QXEY4NV8sPEJSCios+UVlVSQNJ0MDcR1DS2rHQr0rPS8fdG6AvuDQpIFOCEGckfynJepp2es7Ba1jZwNPFq7-XqCqWl3ItPiDsezhvJjAq3PQGcw6cyGdzXWp1AAsbkeaz8PUC-RC1GEEEghwBo1ABXMSxhhWsOkRqxAz1RW3eqRiP1xuXx4wQ5jh4modWMkOhNUK9QRTWaQA */
createMachine ({
  id: "shopping machine",
  predictableActionArguments: true,
  initial: "empty",
  context:{
    cart:[]
  },
  states: {
    empty: {
      on: {
        ADD_PRODUCT: {
          actions:assign({
            cart:(context, event) => [
                ...context.cart,
                {"name": event.name, "price": event.price, "image": event.mainImage.url, "alt":  event.mainImage.alt }
              ]
        }),
          target:"adding"
      },
        },
    },
    adding: {
      on: {
        ADD_PRODUCT: {
            actions:assign({
                cart:(context, event) => [
                    ...context.cart,
                    {"name": event.name, "price": event.price, "image": event.mainImage.url, "alt":  event.mainImage.alt }
                  ]
            }),
            target:"adding"
        },
        REMOVE_PRODUCT: {
          actions:(context, event) => { debugger;var removeIndex = context.cart.map(item => item.name).indexOf(event.name); ~removeIndex && context.cart.splice(removeIndex, 1);},
          target:"adding"
      },
        },
    },
    full: {}
  }
})

