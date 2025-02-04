import { MeiliSearch } from 'meilisearch'
import fetch from 'node-fetch'

const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY
})

async function indexProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
  const products = await response.json()
  
  const index = meilisearch.index('products')
  await index.addDocuments(products)
  console.log('Produtos indexados com sucesso!')
}

indexProducts()