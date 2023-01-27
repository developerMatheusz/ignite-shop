import { HomeContainer, Product } from "../styles/pages/home";
import camiseta1 from "../assets/shirts/1.png";
import camiseta2 from "../assets/shirts/2.png";
import camiseta3 from "../assets/shirts/3.png";
import camiseta4 from "../assets/shirts/4.png";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import Image from "next/image";

interface HomeProps {
  products: {
    id: string, 
    name: string, 
    imageUrl: string, 
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3, 
      spacing: 48
    }
  });

  return (
    
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map(product => {
          return(

            <Link key={product.id} href={`/product/${product.id}`}>
              <Product className="keen-slider__slide">
                <Image 
                  src={product.imageUrl} 
                  width={520} 
                  height={480} 
                  alt="" 
                />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>

          );
        })
      }
    </HomeContainer>

  );

}

//getServerSideProps dá acesso ao contexto da requisição feita para o backend
//getStaticProps utiliza o conceito de SSG do NextJS
//SSG significa Static Site Generation
//Não posso criar uma versão estática de uma página que precise utilizar informações dinâmicas
//Exemplo: Dados do banco de dados, trabalhar com redirecionamento por ID, trabalhar com cookies e etc...
export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ["data.default_price"]
  });

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id, 
      name: product.name, 
      imageUrl: product.images[0], 
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency", 
        currency: "BRL"
      }).format(price.unit_amount / 100)
    }

  });

  console.log(response.data);

  return {
    props: {
      products
    }, 
    revalidate: 60 * 60 * 2
    //A prop revalidate faz com que de 2 em 2 horas uma nova versão estática desta página seja gerada
  }

}
