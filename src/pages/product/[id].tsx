import { GetStaticPaths, GetStaticProps } from "next";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";
import { useRouter } from "next/router";
import Image from "next/image";
import Stripe from "stripe";

interface ProductProps {
    product: {
        id: string, 
        name: string, 
        imageUrl: string, 
        price: string, 
        description: string
    }
}

export default function Product({ product }: ProductProps) {

    const { isFallback } = useRouter();

    if (isFallback) {
        return <p>Carregando...</p>
    }

    return(

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
                    <button>Comprar agora</button>
                </ProductDetails>
            </ProductContainer>

    );

}

//Método utilizado para todos os componentes que tem um método getStaticProps com parâmetros
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        //No objeto paths tem duas opções, ou deixar sem nenhum params para carregar páginas estáticas a medida que os usuários vão acessando, ou deixar somente o essencial para já ser gerado as páginas estáticas com passagem de parâmetros
        paths: [], 
        //fallback com o valor falso faz com que quando um usuário for acessar um produto que não está setado no objeto paths, irá dar erro 404 not found
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
                description: product.description
            }
        }, 
        //60 segundos vezes 60 vezes 1, isso indica que o conteúdo estático será atualizado a cada 1 hora
        revalidate: 60 * 60 * 1
    }

}
