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
  sku?: string
  barcode?: string
  weight?: number
  weightUnit?: string
}

export interface Product {
  // Base product fields (native Shopify fields)
  id: string
  title: string
  handle: string
  tags: string[] | null
  description: string
  collection: string
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

  // Collection information (managed by Shopify's native collections)
  collections?: {
    id: string
    title: string
    handle: string
  }[]

  // Existing metafields (keeping original names)
  details?: string // Rich text - Product details
  how_to?: string // Rich text - How to use the product
  ingredients?: string // Rich text - Complete ingredient list
  earth_conscious_details?: string // Rich text - Environmental information

  // New fields for filtering and enhanced functionality
  // Ingredient categorization
  key_ingredients?: string[] // List - Highlighted main ingredients for filtering
  free_from?: string[] // List - Highlighted absent ingredients for filtering
  botanical_ingredient?: string[] // List - Botanical ingredients

  // Product characteristics
  skin_type?: string[] // List - dry, oily, combination, sensitive, normal, all
  hair_type?: string[] // List - straight, wavy, curly, coily, all
  concern?: string[] // List - aging, acne, dryness, etc.
  benefits?: string[] // List - moisturizing, soothing, anti_aging, etc.
  fragrance_family?: string // Single value - floral, woody, oriental, etc.
  spf_level?: number // Number - Sun protection factor

  // Texture and application
  texture?: string[] // List - gel, cream, oil, powder, liquid, balm, mousse, spray
  finish?: string // Single value - matte, dewy, natural, satin, glowy, radiant
  coverage?: string // Single value - sheer, light, medium, full (for makeup)
  application_method?: string[] // List - brush, fingers, sponge, applicator
  scent_intensity?: string // Single value - light, medium, strong
  color_family?: string // Single value - nude, red, pink, berry, etc.
  color_hex?: string // Single value - color code
  size_volume?: string // Single value - product size/volume specification

  // Certifications and sustainability
  is_organic?: boolean // Boolean - Certified organic product
  is_vegan?: boolean // Boolean - Vegan formula
  is_cruelty_free?: boolean // Boolean - Not tested on animals
  packaging_recyclable?: boolean // Boolean - Recyclable packaging
  refillable?: boolean // Boolean - Refillable product
  carbon_neutral?: boolean // Boolean - Carbon neutral product
  biodegradable_formula?: boolean // Boolean - Biodegradable formula
  ethical_sourcing?: string[] // List - fair trade, community trade, etc.
  sustainability_certification?: string[] // List - specific certifications

  // Marketing and display attributes
  isBestseller?: boolean // Boolean - Best-selling product
  isNewArrival?: boolean // Boolean - Newly arrived product
  isOnSale?: boolean // Boolean - Product on sale
  isLimitedEdition?: boolean // Boolean - Limited edition product
  seasonal_collection?: string // Single value - summer, winter, holiday collection
  target_age_group?: string[] // List - teen, adult, mature
  gender_target?: string // Single value - unisex, feminine, masculine
  price_tier?: string // Single value - budget, mid-range, luxury

  // Usage information
  routine_step?: string // Single value - cleanser, toner, serum, etc.
  usage_time?: string[] // List - morning, evening, weekly
  usage_frequency?: string // Single value - daily, weekly, monthly
  application_time?: number // Number - time in minutes for application
  results_timeframe?: string // Single value - immediate, 2 weeks, 30 days, etc.
  shelf_life?: number // Number - months after opening

  // Shopping features
  subscription_eligible?: boolean // Boolean - Can be purchased as subscription
  gift_eligible?: boolean // Boolean - Suitable as gift
  sample_available?: boolean // Boolean - Free sample available
  bundle_products?: string[] // List - products that go well together

  // SEO and discovery
  searchKeywords?: string[] // List - additional keywords
  relatedProducts?: string[] // List - IDs of related products
  rating?: number // Number - Average product rating
  reviewCount?: number // Number - Number of reviews
}

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
}

export interface Product2 {
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

  // Collection information (managed by Shopify's native collections)
  collections?: {
    id: string
    title: string
    handle: string
  }[]

  // Existing metafields (keeping original names)
  details?: string // Rich text - Product details
  how_to?: string // Rich text - How to use the product
  ingredients?: string // Rich text - Complete ingredient list
  earth_conscious_details?: string // Rich text - Environmental information

  // Marketing and display fields (critical for dropshipping)
  isBestseller?: boolean // High-converting products
  isNewArrival?: boolean // For marketing new items
  isOnSale?: boolean // Promotional items
  isLimitedEdition?: boolean // Creates urgency

  // Key filtering fields (essential for customer navigation)
  skin_type?: string[] // dry, oily, combination, sensitive, normal, all
  hair_type?: string[] // straight, wavy, curly, coily, all
  concern?: string[] // aging, acne, dryness, etc.
  benefits?: string[] // moisturizing, soothing, anti_aging, etc.

  // Product categorization via key ingredients
  key_ingredients?: string[] // Highlighted main ingredients for filtering
  free_from?: string[] // Ingredients NOT in product (for filters)

  // Essential certification badges (marketing value)
  is_vegan?: boolean // Vegan formula
  is_cruelty_free?: boolean // Not tested on animals
  is_organic?: boolean // Organic certification

  // Usage information (helps with product information)
  routine_step?: string // cleanser, toner, serum, etc.
  usage_time?: string[] // morning, evening, weekly

  // Simplified texture and application (key for customer experience)
  texture?: string[] // gel, cream, oil, powder, liquid, etc.
  finish?: string // matte, dewy, natural, etc. (for makeup)

  // SEO and Discovery (critical for visibility)
  searchKeywords?: string[] // Additional keywords for search engines
  rating?: number // Display product rating (social proof)
  reviewCount?: number // Number of reviews (social proof)
}
