// src/scripts/index-products.mjs
import { MeiliSearch } from 'meilisearch';
import { getProducts } from '../http/products.js'; // Note a extensão .js

// Garante que as variáveis de ambiente estão carregadas
import dotenv from 'dotenv';
dotenv.config();

const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || ''
});

async function indexProducts() {
  try {
    console.log('Iniciando indexação de produtos...');
    const products = await getProducts();
    
    if (!products || !Array.isArray(products)) {
      throw new Error('Produtos não encontrados ou formato inválido');
    }

    const index = meilisearch.index('products');
    await index.addDocuments(products);
    
    console.log(`${products.length} produtos indexados com sucesso!`);
    process.exit(0);
  } catch (error) {
    console.error('Erro durante indexação:', error);
    process.exit(1);
  }
}

indexProducts();