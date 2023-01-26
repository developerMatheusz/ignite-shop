import { useRouter } from "next/router";

export default function Product() {

    //Buscar um produto específico através do hook useRouter.
    //useRouter pega o ID passado como parâmetro e trata ele.
    const { query } = useRouter();

    return(

        <div>
            Produto: {JSON.stringify(query)}
        </div>

    );

}
