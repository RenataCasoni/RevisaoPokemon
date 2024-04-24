// Função para alterar o título da página
function changePageTitle(title) {
    document.title = title; // Define o título da página
  }
  
  // Função para gerar a seção de informações sobre o Pokémon
  function generateInfoSection(sprites, pokemonName) {
    const imagens = Object.values(sprites)
      .filter(sprite => typeof sprite === 'string'); // Filtra apenas as URLs das imagens
  
    const h2 = document.createElement('h2'); // Cria um elemento <h2>
    h2.id = "info-pokemon-label"; // Define o id do <h2>
    h2.textContent = `Informações sobre ${pokemonName}`; // Define o texto do <h2>
  
    const img = document.querySelector('img'); // Seleciona o elemento <img> existente na página
    img.src = imagens[0]; // Define o src da imagem como a primeira URL
    img.alt = `Imagem do pokemon ${pokemonName}`; // Define o atributo alt da imagem
  
    const section = document.querySelector('#info-pokemon'); // Seleciona a seção com id "info-pokemon"
  
    section.appendChild(h2); // Adiciona o <h2> como filho da seção
    section.appendChild(img); // Adiciona a imagem como filho da seção
  
    let indiceAtual = 0; // Variável para controlar o índice da imagem exibida
  
    // Adiciona um listener para o evento de clique na imagem
    img.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % imagens.length; // Calcula o próximo índice circularmente
      img.src = imagens[indiceAtual]; // Atualiza o src da imagem com a próxima URL
    });
  }
  
  // Função assíncrona para obter os dados do Pokémon da API
  async function getPokemonData(name) {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // Faz uma requisição assíncrona à API
  
      const jsonData = await data.json(); // Converte a resposta para JSON
  
      generateInfoSection(jsonData.sprites, name); // Chama a função para gerar a seção de informações com os dados obtidos
    } catch (error) {
      console.error(error); // Trata qualquer erro ocorrido durante a requisição
    }
  }
  
  // Função para obter os parâmetros de busca da URL
  function getSearchParams() {
    // Verifica se há parâmetros de busca na URL
    if (!location.search) {
      return; // Retorna se não houver parâmetros de busca
    }
  
    const urlSearchParams = new URLSearchParams(location.search); // Cria um objeto URLSearchParams com os parâmetros de busca da URL
  
    const pokemonName = urlSearchParams.get('name'); // Obtém o valor do parâmetro 'name'
  
    changePageTitle(`Página do ${pokemonName}`); // Altera o título da página
    getPokemonData(pokemonName); // Chama a função para obter os dados do Pokémon com o nome especificado
  }
  
  // Evento que é acionado quando o conteúdo da página é carregado
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams(); // Chama a função para obter os parâmetros de busca da URL quando o conteúdo da página é carregado
  });
  