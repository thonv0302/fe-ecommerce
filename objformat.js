const data = {
  operationName: 'CreateProduct',
  variables: {
    product: {
      title: 'product 2',
      descriptionHtml: '',
      seo: {
        title: '',
        description: '',
      },
      status: 'ACTIVE',
      options: ['Size', 'Color'],
      images: [],
      tags: [],
      productCategory: null,
      productType: '',
      collectionsToJoin: [],
      variants: [
        {
          imageId: null,
          options: ['L', 'black'],
          sku: '',
          inventoryQuantities: 10,
          cost: '1000.00',
          price: '1000.00',
          compareAtPrice: null,
        },
      ],
    },
    media: [
      {
        mediaContentType: 'IMAGE',
        originalSource:
          'https://shopify-staged-uploads.storage.googleapis.com/tmp/63417123015/products/274060c2-dc24-4b68-8f61-7117909f016c/khanh.jpg',
      },
      {
        mediaContentType: 'IMAGE',
        originalSource:
          'https://shopify-staged-uploads.storage.googleapis.com/tmp/63417123015/products/543fe214-05d5-4829-861c-35caff1ca078/tho.jpg',
      },
    ],
  },
};

const data2 = {
  operationName: 'CreateProductCreateProductVariants',
  variables: {
    productId: 'gid://shopify/Product/7767382589639',
    variantsToBulkCreate: [
      {
        imageId: null,
        options: ['L', 'white'],
        sku: '',
        availableQuantity: 20,
        cost: '1000.00',
        price: '2000.00',
        compareAtPrice: null,
      },
      {
        imageId: null,
        options: ['M', 'black'],
        sku: '',
        availableQuantity: 30,
        cost: '1000.00',
        price: '3000.00',
        compareAtPrice: null,
      },
      {
        imageId: null,
        options: ['M', 'white'],
        sku: '',
        availableQuantity: 40,
        price: '4000.00',
        compareAtPrice: null,
      },
      {
        imageId: null,
        options: ['S', 'black'],
        sku: '',
        inventoryQuantities: 50,
        cost: '1000.00',
        price: '5000.00',
        compareAtPrice: null,
      },
      {
        imageId: null,
        options: ['S', 'white'],
        sku: '',
        availableQuantity: 60,
        cost: '1000.00',
        price: '6000.00',
        compareAtPrice: null,
      },
    ],
  },
};

const getProduct = [
  {
    id: 'gid://shopify/ProductVariant/43324295970985',
    price: '0',
    compareAtPrice: null,
    sku: '',
    inventoryQuantity: 0,
    position: 1,
    image: null,
    taxCode: '',
    selectedOptions: [
      {
        name: 'Size',
        value: 'L',
      },
      {
        name: 'Color',
        value: 'Black',
      },
    ],
  },
];

function generateCombinations(arrays, currentCombo = [], currentIndex = 0) {
  if (currentIndex === arrays.length) {
    return [currentCombo.join(' / ')];
  }

  const currentArray = arrays[currentIndex];
  const combinations = [];

  for (let i = 0; i < currentArray.length; i++) {
    const currentElement = currentArray[i];
    const updatedCombo = [...currentCombo, currentElement];
    const subCombinations = generateCombinations(
      arrays,
      updatedCombo,
      currentIndex + 1
    );
    combinations.push(...subCombinations);
  }

  return combinations;
}

function cartesianProduct(arrays) {
  if (!arrays || arrays.length === 0) {
    return [];
  }

  function combine(currentArrayIndex, currentCombination) {
    if (currentArrayIndex === arrays.length) {
      return [currentCombination.join(' / ')];
    }

    const currentArray = arrays[currentArrayIndex];
    const combinations = [];

    for (let i = 0; i < currentArray.length; i++) {
      const currentElement = currentArray[i];
      const updatedCombination = [...currentCombination, currentElement];
      const subCombinations = combine(
        currentArrayIndex + 1,
        updatedCombination
      );
      combinations.push(...subCombinations);
    }

    return combinations;
  }

  return combine(0, []);
}
