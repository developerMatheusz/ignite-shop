![Logo do R](https://www.iconfinder.com/icons/9118036/download/png/48)
# Fundamentos do NextJS
> O framework React para a Web
## O que é NextJS?
NextJS é um framework Server Side Rendering (SSR) e Static Site Rendering (SSR) e executa a biblioteca de componentes React ao lado do servidor.

React é uma biblioteca de componentes JavaScript que serve para construir interfaces gráficas Web modernas. Ela utiliza o conceito de Client Side Rendering e Single Page Application.

NextJS veio para resolver o problema que a biblioteca de componentes React enfrentava por se tratar de uma biblioteca que executa ao lado do cliente. Este problema é chamado de indexação de conteúdo e quem os realiza são web crawlers.

## O que são Web Crawlers?
![Logo do R](https://neilpatel.com/wp-content/uploads/2019/10/web-crawler-no-marketing-digital.jpeg)

Em geral, os web crawlers são bots normalmente utilizados por navegadores de internet, tendo como objetivo percorrer por toda a infraestrutura da internet buscando páginas HTML de servidores Web para indexação de conteúdo.

Estes rastreadores de rede são principalmente utilizados para criar uma cópia de todas as páginas visitadas para um pós-processamento por um motor de pesquisa que irá indexar as páginas baixadas para prover pesquisas mais rápidas.

## O grande problema de tecnologias Single Page Application (SPA)

![Logo do R](https://www.outsystems.com/-/media/images/root/glossary/what-is-single-page-application/single-page-application-01.jpg?updated=20220407113943)

Quando o assunto é SEO (Search Engine Optimization) o React peca em vários sentidos. Entre eles, está a falta de indexação por motores de buscas em páginas desenvolvidas usando essa tecnologia.

A explicação para este problema acontecer com o React é muito simples. Como os web crawlers são programas rastreadores que buscam por páginas para então os motores de buscas indexar, o timeout da ação de buscar e copiar o conteúdo de uma página HTML deve ser extremamente rápida.

Por isso, o React não consegue ser indexado nos motores de buscas. Oque acontece por baixo dos panos é que o React renderiza todos os seus componentes em um único elemento HTML (normalmente sendo uma div), e a forma como essa tecnologia renderiza é através de JavaScript.

Aí que entra o grande X da questão. Web Crawlers são bots que tem um timeout específico para buscar por uma página, e além disso eles não tem JavaScript habilitado.

Por causa disso, estes robôs não conseguem buscar por páginas escritas em React. Pois React é executado através de JavaScript, quando o JavaScript é desabilitado a página simplesmente some.

## NextJS por baixo dos panos

![Logo do R](https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Screenshots_2022/Server-side-rendering-diagram.png)

O NextJS resolve este problema de indexação de páginas por motores de buscas através de uma arquitetura chamada Server Side Rendering (SSR). Essa abordagem é bem antiga e ainda hoje é bastante utilizada, ainda mais no framework NextJS que consegue otimizar o desempenho da aplicação no mais alto nível.

Em um app Single Page, oque acontece em geral é o usuário entrar na página e ela ser carregada ao lado do navegador do cliente. É um tipo de arquitetura bem simples de entender seu funcionamento, porém, trás desvantagens.

A principal desvantagem é o fato de não ser indexado por motores de buscas, a segunda é que sem JavaScript o site não roda. E fora outros motivos como problemas de compilação de acordo com o navegador, já experimentou criar um site React para executar no Internet Explorer? :D

Já o NextJS age de uma forma bem diferente. Quando o usuário entra em um site escrito em Next, ele não está acessando o front-end da aplicação, mas sim o back-end escrito em NodeJS.

Nisso, todas as requisições passam pelo back-end, o back-end NextJS pode ter um controlador para buscar dados em um banco de dados integrado ao sistema ou fazer requisições a API's RESTful facilmente em qualquer sistema que seja e devolver em formato JSON para o front-end.

Desta forma, o NextJS só permite o usuário visualizar o conteúdo do site quando o back-end carrega o documento HTML, CSS e arquivos linkáveis para o cliente poder consumir.

Então o problema de indexação de páginas é resolvido a partir daí. O NextJS utiliza React para criar componentes e devolvê-los para o front-end através de Files System Routing (FSR).

>> [LEMBRETE]: Para poder utilizar a API do stripe, vá ao site stripe.com e faça registro com suas credenciais bancárias. Fique tranquilo, para criar conta não é necessário adicionar cartão de crédito. É necessário apenas adicionar informações que diz respeito a transferência para sua conta, pois será utilizado o modo teste na plataforma da stripe.

>> Após isso, crie um arquivo no diretório raiz do projeto chamado .env.local e adicione 3 chaves com valores. A primeira será o nome NEXT_URL=http://localhost:3000 (diz respeito há URL de acesso ao site localhost feito em NextJS), a segunda chave deve ter o nome de STRIPE_PUBLIC_KEY com o valor da chave pública que o site da stripe lhe oferece em modo teste, a última chave tem o nome de STRIPE_SECRET_KEY e também é fornecida pela plataforma da stripe em modo teste.
