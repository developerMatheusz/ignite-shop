import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  //Redirecionamento pelo getServerSideProps caso uma condição não seja válida
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"]
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  };
};

//Pode-se buscar dados de uma API de três formas:
//Client-side (useEffect) --> getServerSideProps --> getStaticProps

/* 
    getStaticProps é utilizado para páginas que o objetivo é entregar o conteúdo de uma forma bastante rápida, por ter seu html, css e js armazenado em memória cache.

    O useEffect busca dados direto do front-end, neste caso, informações sigilosas são expostas muito facilmente comprometendo assim o sistema. Como o stripe utiliza a chave secreta do back-end para se comunicar com o sistema ignite-shop, é extremamente arriscado deixar a chave secreta ao lado do cliente.

    Já getServerSideProps é executado no servidor Node, podendo gerar conteúdo dinâmico e é utilizado geralmente para páginas dinâmicas como essa página de sucesso. Em que o objetivo é mostrar os dados do cliente e produto comprado.
*/
