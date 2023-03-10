import { GetStaticPaths, GetStaticProps } from "next";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";
import { useRouter } from "next/router";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
    product: {
        id: string, 
        name: string, 
        imageUrl: string, 
        price: string, 
        description: string, 
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyProduct() {
        
        try {

            setIsCreatingCheckoutSession(true);

            const response = await axios.post("/api/checkout", {
                priceId: product.defaultPriceId
            });

            const { checkoutUrl } = response.data;
            window.location.href = checkoutUrl;

        } catch (error) {
            setIsCreatingCheckoutSession(false);
            //Conectar com alguma ferramenta de observabilidade
            alert("Falha ao redirecionar ao checkout!");
        }

    }

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return(

        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image 
                        src={product.imageUrl} 
                        width={520} 
                        height={480} 
                        alt="" 
                    />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
                </ProductDetails>
            </ProductContainer>
        </>

    );

}

//M??todo utilizado para todos os componentes que tem um m??todo getStaticProps com par??metros
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        //No objeto paths tem duas op????es, ou deixar sem nenhum params para carregar p??ginas est??ticas a medida que os usu??rios v??o acessando, ou deixar somente o essencial para j?? ser gerado as p??ginas est??ticas com passagem de par??metros
        paths: [], 
        //fallback com o valor falso faz com que quando um usu??rio for acessar um produto que n??o est?? setado no objeto paths, ir?? dar erro 404 not found
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"]
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id, 
                name: product.name, 
                imageUrl: product.images[0], 
                price: new Intl.NumberFormat("pt-BR", {
                    style: "currency", 
                    currency: "BRL"
                }).format(price.unit_amount / 100), 
                description: product.description, 
                defaultPriceId: price.id
            }
        }, 
        //60 segundos vezes 60 vezes 1, isso indica que o conte??do est??tico ser?? atualizado a cada 1 hora
        revalidate: 60 * 60 * 1
    }

}
