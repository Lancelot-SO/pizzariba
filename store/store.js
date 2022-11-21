import create from "zustand"

export const useStore = create(
    (set) => ({


        //cart
        cart : {
            pizzas : []
        },

        //add pizza to cart
        addPizza: (data) =>
        set((state)=>({
            cart: {
                pizzas: [...state.cart.pizzas, data]
            }
        })),

        //remove pizza from cart

        removePizza : (index) => 
        set ((state)=>({
            cart: {
                pizzas : state.cart.pizzas.filter((_, i)=>  i !=index)
            }
        })),

        //reset pizza cart
        resetCart: () =>
        set(()=>({
            cart: {
                pizzas: []
            }
        })) 
    })
)