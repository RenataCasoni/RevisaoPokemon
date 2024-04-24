// Definição da chave utilizada para armazenar os dados de contagem de visitantes no localStorage
const lsVisistorsKey = '@visitorsCounter'

// Objeto padrão para contagem de visitantes caso não haja dados no localStorage
const defaultLsVisitors = {
  count: 0, // Contagem inicial de visitantes
  lastVisit: getCurrentDateAndTime(), // Data e hora da última visita, obtida pela função getCurrentDateAndTime()
}

// Função para obter a data e hora atual no formato desejado
function getCurrentDateAndTime() {
  const locale = 'pt-BR' // Configuração do local para o formato da data e hora
  const date = new Date() // Obtém a data e hora atual

  // Opções de formatação da data e hora
  options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  // Formata a data e hora de acordo com as opções e o local especificados
  const time = new Intl.DateTimeFormat(locale, options).format(date)
  return time // Retorna a data e hora formatadas
}

// Função para contar os visitantes da página
function countVisitors() {
  // Obtém os dados de contagem de visitantes do localStorage ou utiliza o objeto padrão se não houver dados
  const lsVisitors =
    localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
  const lsVisitorsObj = JSON.parse(lsVisitors) // Converte os dados de JSON para objeto JavaScript

  lsVisitorsObj.count++ // Incrementa a contagem de visitantes
  lsVisitorsObj.lastVisit = getCurrentDateAndTime() // Atualiza a data e hora da última visita

  // Armazena os dados atualizados de contagem de visitantes de volta no localStorage
  localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

  // Cria um parágrafo para exibir a contagem de visitantes e a última visita
  const p = document.createElement('p')
  p.id = 'visitors-counter'
  p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

  // Seleciona o elemento footer na página
  const footer = document.querySelector('footer')

  // Adiciona o parágrafo com as informações de contagem de visitantes ao final do footer
  footer.appendChild(p)
}

// Evento que é acionado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
  countVisitors() // Chama a função para contar os visitantes quando o conteúdo da página é carregado
})
