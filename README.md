<div align="center">
  <img src="assets/brand-header.png" alt="Molduras Decorativas" width="420" />

  # Calculadora Decorativa

  Aplicativo móvel para calcular, de forma rápida e padronizada, o preço de produtos de molduraria.

  ![Expo](https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white)
  ![React Native](https://img.shields.io/badge/React_Native-0.86-20232A?logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
</div>

## Sobre o projeto

A **Calculadora Decorativa** centraliza os principais componentes de custo de um produto de molduraria e apresenta o valor final instantaneamente. A interface foi projetada para uso em dispositivos móveis, com identidade visual própria e suporte a cálculos para uma ou várias unidades.

## Funcionalidades

- Cálculo das dimensões e da área do produto.
- Cálculo do comprimento e do custo da moldura, incluindo perda adicional.
- Custos por metro quadrado para vidro, fundo, paspatur, tecido e impressão.
- Inclusão de serviço e acréscimo percentual.
- Quantidade opcional de produtos, com exibição do preço unitário e do total do pedido.
- Formatação monetária em real brasileiro (`BRL`).
- Limpeza de todos os campos com um único comando.
- Interface responsiva em tema escuro.

## Como o cálculo funciona

O aplicativo calcula o custo unitário a partir dos seguintes valores:

```text
Área = (largura × altura) / 10.000
Comprimento da moldura = 2 × (largura + altura) + perda
Subtotal = moldura + materiais + serviço
Acréscimo = subtotal × percentual / 100
Preço unitário = subtotal + acréscimo
Preço final = preço unitário × quantidade
```

A largura, a altura e a perda são informadas em centímetros. Os materiais são precificados por metro quadrado e a moldura por metro linear. Quando a quantidade não é preenchida, o cálculo considera uma unidade.

## Tecnologias

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- ESLint com configuração do Expo

## Pré-requisitos

Para executar o projeto, instale:

- [Node.js](https://nodejs.org/) em versão LTS;
- npm;
- Expo Go em um dispositivo móvel, ou um ambiente Android/iOS configurado.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/ti-lucasdev/calculadora_decorativa.git
cd calculadora_decorativa
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Depois, leia o QR Code pelo Expo Go ou escolha uma das opções exibidas no terminal.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo. |
| `npm run android` | Compila e executa o aplicativo no Android. |
| `npm run ios` | Compila e executa o aplicativo no iOS. |
| `npm run web` | Inicia a versão web. |
| `npm run lint` | Verifica a qualidade e o padrão do código. |
| `npx tsc --noEmit` | Executa a verificação estática de tipos. |

## Gerando um APK

O perfil `apk` já está configurado no arquivo `eas.json`. Para gerar o instalador Android pelo EAS Build:

```bash
npx eas-cli@latest build --platform android --profile apk
```

É necessário possuir uma conta Expo e autenticar-se quando solicitado.

Para uma compilação local com o projeto nativo já gerado:

```powershell
cd android
.\gradlew.bat assembleRelease
```

O arquivo será criado em `android/app/build/outputs/apk/release/app-release.apk`.

## Estrutura principal

```text
calculadora_decorativa/
├── assets/          # Identidade visual e ícones
├── src/
│   └── pricing.ts   # Regras e fórmulas de precificação
├── App.tsx          # Interface principal
├── app.json         # Configuração do aplicativo Expo
├── eas.json         # Perfis de compilação EAS
└── index.ts         # Ponto de entrada
```

## Qualidade

Antes de enviar alterações, execute:

```bash
npm run lint
npx tsc --noEmit
```

## Licença

Consulte o arquivo [LICENSE](LICENSE) para conhecer os termos aplicáveis ao projeto.
