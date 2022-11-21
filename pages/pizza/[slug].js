import { client, urlFor } from "../../lib/client";
import Image from "next/image";
import RightArrow from "../../assets/arrowRight.png";
import LeftArrow from "../../assets/arrowLeft.png";
import Layout from "../../components/Layout";
import css from "../../styles/Pizza.module.css";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";



export default ({ pizza }) => {
  const src = urlFor(pizza.image).url();
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  //handlequantity
  const handleQuantity = (type) => {
    type === "increment"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  //add to cart function

  const addPizza = useStore((state)=>state.addPizza)
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[size],
      quantity: quantity,
      size: size,
    });
    toast.success('Added to cart')
  };
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.ImageWrapper}>
          <Image
            loader={() => src}
            alt=""
            src={src}
            layout="fill"
            unoptimized
            objectFit="cover"
          />
        </div>
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>

          <span>
            <span style={{ color: "var(--themeRed)" }}>$</span>{" "}
            {pizza.price[size]}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariant}>
              <div
                onClick={() => setSize(0)}
                className={size === 0 ? css.selected : ""}
              >
                Small
              </div>
              <div
                onClick={() => setSize(1)}
                className={size === 1 ? css.selected : ""}
              >
                Medium
              </div>
              <div
                onClick={() => setSize(2)}
                className={size === 2 ? css.selected : ""}
              >
                Large
              </div>
            </div>
          </div>

          {/* quantity counter */}
          <div className={css.quantity}>
            <span>Quantity</span>

            <div className={css.counter}>
              <Image
                src={LeftArrow}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => handleQuantity("decrement")}
              />

              <span>{quantity}</span>

              <Image
                src={RightArrow}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => handleQuantity("increment")}
              />
            </div>
          </div>

          {/* nutton */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>
            Add to cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "pizza" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type == "pizza" && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
