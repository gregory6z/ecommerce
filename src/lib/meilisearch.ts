import { env } from "@/env"
import { MeiliSearch } from "meilisearch"

export const meilisearch = new MeiliSearch({
  host: env.NEXT_PUBLIC_MEILISEARCH_HOST,
  apiKey: env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
})

// export async function configureMeilisearchIndex() {
//   // Configuração principal do MeiliSearch para e-commerce de cosméticos
//   await meilisearch.index("products").updateSettings({
//     // Atributos pesquisáveis com prioridade (ordem é importante)
//     searchableAttributes: [
//       "title",
//       "brand",
//       "description",
//       "details", // Metafield existente
//       "instructions", // Metafield existente
//       "ingredients", // Metafield existente
//       "eco_details", // Metafield existente
//       "product_type",
//       "botanical_ingredient",
//       "benefits",
//       "fragrance_family",
//       "handle",
//       "tags",
//       "collection",
//       "variants.title",
//     ],

//     // Atributos filtráveis para refinamento de busca
//     filterableAttributes: [
//       "availableForSale",
//       "brand",
//       "product_type",
//       "skin_type",
//       "hair_type",
//       "concern",
//       "botanical_ingredient",
//       "benefits",
//       "is_organic",
//       "is_vegan",
//       "is_cruelty_free",
//       "spf_level",
//       "fragrance_family",
//       "eco_details", // Metafield existente para filtros eco
//       "tags",
//       "collection",
//       "price.amount",
//       "variants.availableForSale",
//       "variants.quantityAvailable",
//       "rating",
//       "isNewArrival",
//       "isOnSale",
//       "isBestseller",
//       "isLimitedEdition",
//       "hasEcoPackaging",
//       "isGiftIdea",
//     ],

//     // Atributos ordenáveis
//     sortableAttributes: [
//       "price.amount",
//       "createdAt",
//       "rating",
//       "soldCount",
//       "spf_level",
//       "title",
//     ],

//     // Regras de classificação otimizadas
//     rankingRules: [
//       "words",
//       "typo",
//       "proximity",
//       "attribute",
//       "sort",
//       "exactness",
//       "isBestseller:desc",
//       "soldCount:desc",
//       "rating:desc",
//       "isNewArrival:desc",
//       "isOnSale:desc",
//       "isLimitedEdition:desc",
//     ],

//     // Tolerância de erros de digitação
//     typoTolerance: {
//       enabled: true,
//       minWordSizeForTypos: {
//         oneTypo: 3,
//         twoTypos: 7,
//       },
//       disableOnWords: ["bio", "eco", "spf", "uv"],
//       disableOnAttributes: ["spf_level", "ingredients"],
//     },

//     // Palavras a serem ignoradas na busca (em francês)
//     stopWords: [
//       "le",
//       "la",
//       "les",
//       "un",
//       "une",
//       "des",
//       "du",
//       "de",
//       "et",
//       "ou",
//       "pour",
//       "avec",
//       "sans",
//       "dans",
//       "sur",
//       "par",
//     ],

//     // Atributo para garantir resultados distintos
//     distinctAttribute: "id",

//     // Sinônimos completos para cosméticos estilo Yves Rocher (francês-inglês)
//     synonyms: {
//       // Tipos de produtos
//       "soin visage": ["facial_care", "skincare", "visage", "facial"],
//       nettoyant: ["cleanser", "purifying", "cleansing", "nettoyage"],
//       démaquillant: ["makeup remover", "cleansing", "démaquillage"],
//       "eau micellaire": ["micellar water", "cleansing water", "micellar"],
//       tonique: ["toner", "tonifying", "lotion tonique"],
//       "soin corps": ["body_care", "corps", "body"],
//       "gel douche": ["shower gel", "body wash", "douche"],
//       gommage: ["scrub", "exfoliant", "peeling"],
//       "soin cheveux": ["hair_care", "cheveux", "hair"],
//       shampooing: ["shampoo", "hair cleanser"],
//       "après-shampooing": ["conditioner", "hair conditioner"],
//       "masque cheveux": ["hair mask", "hair treatment"],
//       maquillage: ["makeup", "cosmetic", "maquillage"],
//       "fond de teint": ["foundation", "base", "teint"],
//       correcteur: ["concealer", "corrector"],
//       "rouge à lèvres": ["lipstick", "lip color"],
//       "brillant à lèvres": ["lip gloss", "gloss"],
//       mascara: ["mascara", "cils"],
//       "ombre à paupières": ["eyeshadow", "lidschatten"],
//       parfum: ["fragrance", "eau de parfum", "eau de toilette", "scent"],
//       "eau de parfum": ["edp", "perfume"],
//       "eau de toilette": ["edt", "toilette"],
//       botanique: ["botanical", "plant-based", "herbal", "natural"],
//       coffret: ["gift set", "set", "collection"],

//       // Tipos de pele
//       "peau sèche": ["dry", "dry skin", "déshydratée", "sèche"],
//       "peau grasse": ["oily", "oily skin", "huileuse", "grasse"],
//       "peau mixte": ["combination", "combination skin", "mixte"],
//       "peau sensible": ["sensitive", "sensitive skin", "réactive", "sensible"],
//       "peau normale": ["normal", "normal skin", "équilibrée", "normale"],
//       "tout type de peau": ["all skin types", "all", "universal"],

//       // Tipos de cabelo
//       "cheveux lisses": ["straight", "straight hair", "lisses"],
//       "cheveux ondulés": ["wavy", "wavy hair", "ondulés"],
//       "cheveux bouclés": ["curly", "curly hair", "bouclés"],
//       "cheveux crépus": ["coily", "coily hair", "crépus", "frisés"],
//       "cheveux secs": ["dry hair", "damaged hair", "secs"],
//       "cheveux gras": ["oily hair", "greasy hair", "gras"],
//       "cheveux colorés": ["colored hair", "dyed hair", "colorés"],
//       "cheveux fins": ["fine hair", "thin hair", "fins"],
//       "cheveux épais": ["thick hair", "coarse hair", "épais"],
//       "tous types de cheveux": ["all hair types", "universal", "tous types"],

//       // Preocupações
//       "anti-âge": ["aging", "anti-aging", "rides", "ridules", "âge"],
//       "anti-rides": ["anti-wrinkle", "wrinkles", "fine lines", "rides"],
//       acné: ["acne", "imperfections", "boutons", "points noirs", "impuretés"],
//       hydratation: ["dryness", "hydration", "déshydratation", "hydratant"],
//       matifiant: ["oiliness", "mattifying", "excès de sébum", "brillance"],
//       taches: [
//         "pigmentation",
//         "dark spots",
//         "spots",
//         "hyperpigmentation",
//         "taches brunes",
//       ],
//       éclaircissant: ["brightening", "illuminating", "éclaircir", "éclat"],
//       apaisant: ["soothing", "calming", "sensitivity", "apaise", "calmant"],
//       fermeté: ["firmness", "toning", "raffermissant", "tonifiant", "lift"],
//       poches: ["puffiness", "eye puffiness", "gonflements", "poches yeux"],
//       cernes: ["dark circles", "eye circles", "yeux fatigués", "cernes yeux"],
//       protection: ["sun protection", "spf", "uv shield", "protection solaire"],
//       nutrition: ["nourishing", "nutrition", "nourrissant", "riche"],
//       équilibrant: ["balancing", "equilibrium", "équilibre", "balance"],
//       purifiant: ["purifying", "detoxifying", "purifie", "détox"],
//       exfoliant: ["exfoliating", "renewing", "exfoliation", "renouvellement"],

//       // Ingredientes botânicos comuns
//       "aloe vera": ["aloès", "aloe", "aloe extract"],
//       argan: ["huile d'argan", "argan oil", "argania spinosa"],
//       "tea tree": ["arbre à thé", "melaleuca", "tea tree oil"],
//       karité: ["shea butter", "beurre de karité", "butyrospermum parkii"],
//       lavande: ["lavender", "lavandula", "lavender extract"],
//       rose: ["rose flower", "extrait de rose", "rosa damascena"],
//       camomille: ["chamomile", "camomille", "matricaria", "anthemis nobilis"],
//       calendula: ["souci", "calendula officinalis", "marigold"],
//       "thé vert": ["green tea", "camellia sinensis", "tea extract"],
//       hibiscus: ["hibiscus sabdariffa", "fleur d'hibiscus", "rosa sinensis"],
//       avoine: ["oat", "avena sativa", "colloidal oatmeal"],
//       hamamélis: ["witch hazel", "hamamelis virginiana"],
//       bleuet: ["cornflower", "centaurea cyanus", "blueberry"],
//       jojoba: ["huile de jojoba", "jojoba oil", "simmondsia chinensis"],
//       olive: ["olive oil", "huile d'olive", "olea europaea"],
//       "amande douce": [
//         "sweet almond",
//         "huile d'amande",
//         "prunus amygdalus dulcis",
//       ],

//       // Benefícios
//       hydratant: ["moisturizing", "hydrating", "hydrate", "moisture"],
//       apaisant: ["soothing", "calming", "apaise", "calm"],
//       "anti-âge": ["anti-aging", "age-defying", "jeunesse", "youthful"],
//       éclaircissant: ["brightening", "illuminating", "éclat", "radiance"],
//       purifiant: ["purifying", "cleansing", "purifie", "detox"],
//       équilibrant: ["balancing", "rebalancing", "équilibre", "balance"],
//       raffermissant: ["firming", "tightening", "fermeté", "tight"],
//       nourrissant: ["nourishing", "nutritive", "nourrit", "rich"],
//       protecteur: ["protective", "defending", "protège", "shield"],
//       exfoliant: ["exfoliating", "scrubbing", "exfolie", "renew"],
//       lissant: ["smoothing", "softening", "lisse", "smooth"],
//       revitalisant: ["revitalizing", "energizing", "revitalise", "vitality"],
//       régénérant: ["regenerating", "repairing", "régénère", "renew"],

//       // Certificações e características
//       bio: ["organic", "biologique", "certifié bio", "ecocert"],
//       végétalien: ["vegan", "végétal", "100% vegetal"],
//       "non testé": ["cruelty-free", "sans cruauté", "not tested"],
//       naturel: ["natural", "nature", "d'origine naturelle"],
//       "sans parabène": ["paraben-free", "without parabens", "sans paraben"],
//       "sans sulfate": ["sulfate-free", "without sulfates", "sans sulfate"],
//       "sans silicone": ["silicone-free", "without silicone", "sans silicone"],

//       // Famílias de fragrâncias
//       floral: ["flowery", "flower", "florale"],
//       boisé: ["woody", "wood", "bois"],
//       oriental: ["oriental", "spicy", "épicé"],
//       frais: ["fresh", "refreshing", "fraîcheur"],
//       fruité: ["fruity", "fruits", "fruit"],
//       agrumes: ["citrus", "lemon", "orange", "grapefruit"],
//       aromatique: ["aromatic", "herbal", "herbe"],
//       gourmand: ["gourmand", "sweet", "sucré"],
//       aquatique: ["aquatic", "marine", "ocean"],
//       fougère: ["fern", "fougère"],

//       // Termos de busca comuns
//       cadeau: ["gift", "present", "gift idea"],
//       nouveauté: ["new", "new arrival", "nouveau"],
//       offre: ["offer", "deal", "promotion"],
//       "édition limitée": ["limited edition", "limited", "collector"],
//       "best-seller": ["bestseller", "popular", "top seller"],
//       prix: ["price", "cost", "discount"],
//       femme: ["woman", "women", "female"],
//       homme: ["man", "men", "male"],
//       unisexe: ["unisex", "for all", "gender neutral"],
//     },

//     // Configuração para destacar termos pesquisados
//     highlightPreTag: "<mark>",
//     highlightPostTag: "</mark>",

//     // Configuração para autocompletar/sugestões
//     pagination: {
//       maxTotalHits: 1000,
//     },

//     // Faceting para navegação por filtros
//     faceting: {
//       maxValuesPerFacet: 100,
//     },
//   })

//   // Configuração para índices adicionais

//   // Índice para categorias
//   await meilisearch.index("categories").updateSettings({
//     searchableAttributes: ["name", "description"],
//     sortableAttributes: ["name", "productCount"],
//     filterableAttributes: ["featured", "parent"],
//     distinctAttribute: "id",
//   })

//   // Índice para marcas
//   await meilisearch.index("brands").updateSettings({
//     searchableAttributes: ["name", "description", "values", "story"],
//     sortableAttributes: ["name", "productCount", "foundedYear"],
//     filterableAttributes: [
//       "featured",
//       "country",
//       "isVegan",
//       "isCrueltyFree",
//       "isOrganic",
//       "hasEcoPackaging",
//     ],
//     distinctAttribute: "id",
//   })

//   // Índice para coleções e promoções
//   await meilisearch.index("collections").updateSettings({
//     searchableAttributes: ["name", "description", "season"],
//     sortableAttributes: ["name", "startDate", "endDate"],
//     filterableAttributes: ["isActive", "type", "season"],
//     distinctAttribute: "id",
//   })

//   // Índice para ingredientes botânicos
//   await meilisearch.index("botanical_ingredients").updateSettings({
//     searchableAttributes: ["name", "description", "benefits", "scientificName"],
//     sortableAttributes: ["name", "popularityScore"],
//     filterableAttributes: ["category", "source", "benefits"],
//     distinctAttribute: "id",
//   })

//   // Índice para conteúdo relacionado (blogs, guias, etc.)
//   await meilisearch.index("content").updateSettings({
//     searchableAttributes: ["title", "content", "excerpt", "tags"],
//     sortableAttributes: ["publishDate", "popularity"],
//     filterableAttributes: ["type", "category", "author", "tags"],
//     distinctAttribute: "id",
//   })
// }
