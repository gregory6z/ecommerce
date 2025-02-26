export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  quantityAvailable: number
  selectedOptions: {
    name: string
    value: string
  }[]
  // Para produtos de maquiagem, caso as cores sejam variantes:
  color_value?: string // Valor específico da cor desta variante (ex: "Rouge Passion", "Berry")
  color_hex?: string // Código hexadecimal da cor específica desta variante
  // Removidos: sku, barcode, weight, weightUnit (desnecessários para dropshipping)
}

// Base Product Interface - campos comuns a todos os produtos
interface BaseProduct {
  // Base product fields (native Shopify fields)
  id: string
  title: string
  handle: string
  tags: string[] | null
  description: string
  createdAt: Date
  updatedAt?: Date
  images: {
    url: string
    altText: string
  }[]
  variants: ProductVariant[]
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  availableForSale: boolean

  // Collection information
  collections?: {
    id: string
    title: string
    handle: string
  }[]

  subcategory: string // Subcategoria específica dentro da categoria principal

  // Existing metafields (keeping original names)
  details?: string // Rich text - Product details
  how_to?: string // Rich text - How to use the product
  ingredients?: string // Rich text - Complete ingredient list
  earth_conscious_details?: string // Rich text - Environmental information

  // Common ingredient fields
  key_ingredients?: string[] // Highlighted main ingredients for filtering
  free_from?: string[] // Highlighted absent ingredients for filtering
  botanical_ingredient?: string[] // Botanical ingredients

  // Common characteristics
  benefits?: string[] // moisturizing, soothing, anti_aging, etc.
  fragrance_family?: string // floral, woody, oriental, etc.
  scent_intensity?: string // light, medium, strong

  // Common texture fields
  texture?: string[] // gel, cream, oil, powder, liquid, balm, mousse, spray
  size_range?: string // Descriptive size range (e.g., "Available in 30ml, 50ml, 100ml")

  // Common certifications
  is_organic?: boolean // Certified organic product
  is_vegan?: boolean // Vegan formula
  is_cruelty_free?: boolean // Not tested on animals
  packaging_recyclable?: boolean // Recyclable packaging

  // Common marketing attributes
  isBestseller?: boolean // Best-selling product
  isNewArrival?: boolean // Newly arrived product
  isOnSale?: boolean // Product on sale
  isLimitedEdition?: boolean // Limited edition product
  target_age_group?: string[] // teen, adult, mature

  // Common usage information
  usage_time?: string[] // morning, evening, weekly

  // SEO and discovery
  searchKeywords?: string[] // additional keywords
  rating?: number // Average product rating
  reviewCount?: number // Number of reviews
}

// Soins Visage / Skin Care
interface SoinsVisageProduct extends BaseProduct {
  skin_type: string[] // dry, oily, combination, sensitive, normal, all
  concern: string[] // aging, acne, dryness, redness, etc.
  spf_level?: number // Sun protection factor
  finish?: string // matte, dewy, natural, satin, glowy, radiant
  routine_step: string // cleanser, toner, serum, moisturizer, etc.
}

// Soins Corps / Body Care
interface SoinsCorpsProduct extends BaseProduct {
  skin_type?: string[] // dry, oily, sensitive, all
  concern: string[] // dryness, firmness, etc.
}

// Cheveux / Hair Care
interface CheveuxProduct extends BaseProduct {
  hair_type: string[] // straight, wavy, curly, coily, all
  concern: string[] // frizz, volume, damage, dandruff, etc.
  routine_step: string // shampoo, conditioner, treatment, styling, etc.
}

// Maquillage / Makeup
interface MaquillageProduct extends BaseProduct {
  skin_type?: string[] // dry, oily, combination, all
  coverage?: string // sheer, light, medium, full
  finish: string // matte, dewy, satin, radiant, etc.
  color_family: string // Categoria de cor (nude, red, pink, berry, etc.)
}

// Parfums / Fragrances
interface ParfumsProduct extends BaseProduct {
  fragrance_family: string // floral, woody, oriental, fresh, etc.
  scent_intensity: string // light, medium, strong
  fragrance_notes?: {
    top?: string[] // Top notes
    heart?: string[] // Heart/middle notes
    base?: string[] // Base notes
  }
}

// Collections Botaniques / Botanical Collections
interface CollectionsBotaniquesProduct extends BaseProduct {
  botanical_main_ingredient: string // Principal botanical ingredient (aloe_vera, argan, etc.)
  product_types: string[] // Types of products in the collection (skincare, haircare, etc.)
}

// Bio & Eco / Organic & Eco
interface BioEcoProduct extends BaseProduct {
  certification_type: string[] // Types of certifications
  eco_features: string[] // Eco-friendly features
}

// Coffrets & Cadeaux / Sets & Gifts
interface CoffretsProduct extends BaseProduct {
  set_type: string // Type of set (skincare, fragrance, etc.)
  includes: string[] // Products included in the set
  occasion?: string[] // Gift occasions (birthday, holidays, etc.)
}

// Union type for all product types
export type Product =
  | (SoinsVisageProduct & { main_category: "soins_visage" })
  | (SoinsCorpsProduct & { main_category: "soins_corps" })
  | (CheveuxProduct & { main_category: "cheveux" })
  | (MaquillageProduct & { main_category: "maquillage" })
  | (ParfumsProduct & { main_category: "parfums" })
  | (CollectionsBotaniquesProduct & { main_category: "collections_botaniques" })
  | (BioEcoProduct & { main_category: "bio_eco" })
  | (CoffretsProduct & { main_category: "coffrets_cadeaux" })
  | (BaseProduct & { main_category: string })
