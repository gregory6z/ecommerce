const { MeiliSearch } = require('meilisearch')
const { getProducts } = require('../http/products')

const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY
})

async function indexProducts() {
  const products = await getProducts()
  const index = meilisearch.index(products)
  await index.addDocuments(products)
  console.log('Produtos indexados com sucesso!')
}

indexProducts()